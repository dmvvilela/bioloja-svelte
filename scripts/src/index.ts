/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import products from '../data/exported_products.json';
import slugify from 'slugify';
import { and, eq } from 'drizzle-orm';
import { db } from './utils/database';
import * as schema from '../../src/lib/server/db/schema';
import type { DownloadLinksType } from '../../src/lib/server/db/schema';
import { uploadFiles } from './utils/storage';

// We also remove wp-content to avoid site bots.
const wpUrlPrefix = 'https://bioloja.bio.br/wp-content/';
const backupPath = '/Users/danvilela/Code/Bioloja/backup-bioloja-wpcontent/';
const imageBucket = 'bioloja-images';
const downloadBucket = 'bioloja-downloads';

for (const product of products) {
	console.log(product.Nome);

	const slug = slugify(product.Nome, {
		lower: true,
		strict: true,
		locale: 'pt'
	});

	const downloadLinks: DownloadLinksType = [];
	const downloadFiles: string[] = [];
	for (let i = 1; i <= 4; i++) {
		const p = product as any;
		const name = p[`Nome do download ${i}`];
		const url = p[`URL de download ${i}`]?.replace(wpUrlPrefix, '');

		if (name && url) {
			downloadLinks.push({ name, url });

			// Construct the local file path
			const filePath = backupPath + url;
			downloadFiles.push(filePath);
		}
	}

	// Upload files to R2 bucket.
	await uploadFiles(downloadBucket, backupPath, downloadFiles);

	const imageUrls = product.Imagens.split(',').map((url) => url.trim().replace(wpUrlPrefix, ''));
	const imageFiles = imageUrls.map((url) => backupPath + url);

	// Upload images to R2 bucket.
	await uploadFiles(imageBucket, backupPath, imageFiles);

	// Insert product
	const result = await db
		.insert(schema.products)
		.values({
			slug,
			name: product.Nome,
			published: Boolean(product.Publicado),
			featured: Boolean(product['Em destaque?']),
			shortDescription: product['Descrição curta'],
			description: product.Descrição,
			price: Math.round(parseFloat(product.Preço.toString().replace(',', '.')) * 100),
			discountPrice:
				product['Preço promocional'] && product['Preço promocional'] !== ''
					? Math.round(parseFloat(product['Preço promocional'].toString().replace(',', '.')) * 100)
					: null,
			imageUrls: imageUrls.join(', '),
			downloadLinks
		})
		.returning();

	const productId = result[0].id;
	const categoryStrings = product.Categorias.split(',');

	// Insert category and subcategories.
	for (const categoryString of categoryStrings) {
		const [parentName, subcategoryName] = categoryString.split('>').map((name) => name.trim());

		// Get the parent category from the database
		const parent = await db
			.select({ id: schema.categories.id })
			.from(schema.categories)
			.where(eq(schema.categories.name, parentName));

		if (parent.length > 0) {
			if (subcategoryName) {
				// If there's a subcategory name, get the subcategory from the database
				const subcategory = await db
					.select({ id: schema.categories.id })
					.from(schema.categories)
					.where(
						and(
							eq(schema.categories.name, subcategoryName),
							eq(schema.categories.parentId, parent[0].id)
						)
					);

				if (subcategory.length > 0) {
					// If the subcategory exists, link it to the product
					await db.insert(schema.productCategories).values({
						productId: productId,
						categoryId: subcategory[0].id
					});
				} else {
					// Handle the case where the subcategory does not exist in the database
					console.error('subcategory does not exist in the database: ', subcategoryName);
				}
			} else {
				// If there's no subcategory name, link the parent category to the product
				await db.insert(schema.productCategories).values({
					productId: productId,
					categoryId: parent[0].id
				});
			}
		} else {
			// Handle the case where the parent category does not exist in the database
			console.error('parent category does not exist in the database: ', parentName);
		}
	}

	// Insert tags
	const tagNames = product.Tags.split(',').map((name) => name.trim());

	for (const tagName of tagNames) {
		// Get the tag from the database
		const tag = await db
			.select({ id: schema.tags.id })
			.from(schema.tags)
			.where(eq(schema.tags.name, tagName));

		if (tag.length > 0) {
			// If the tag exists, link it to the product
			await db.insert(schema.productTags).values({
				productId: productId,
				tagId: tag[0].id
			});
		} else {
			// Handle the case where the tag does not exist in the database
			console.error('tag does not exist in the database: ', tagName);
		}
	}

	// Insert attributes
	for (let i = 1; i <= 4; i++) {
		// @ts-ignore
		const attributeName = product[`Nome do atributo ${i}`];
		// @ts-ignore
		let attributeValue = product[`Valores do atributo ${i}`];

		if (attributeName && attributeValue !== undefined) {
			// If the attribute value is 0 or 1, or 'Sim', treat it as a boolean
			if (
				attributeValue === 0 ||
				attributeValue === 1 ||
				(typeof attributeValue === 'string' && attributeValue.toLowerCase() === 'sim')
			) {
				attributeValue =
					Boolean(attributeValue) ||
					(typeof attributeValue === 'string' && attributeValue.toLowerCase() === 'sim');
			}

			// Get the attribute from the database
			const attribute = await db
				.select({ id: schema.attributes.id })
				.from(schema.attributes)
				.where(eq(schema.attributes.name, attributeName));

			if (attribute.length === 0) {
				throw new Error(`Attribute ${attributeName} not found`);
			}

			// Insert the attribute value into the productAttributes table
			await db.insert(schema.productAttributes).values({
				productId: productId,
				attributeId: attribute[0].id,
				valueText: typeof attributeValue === 'string' ? attributeValue : null,
				valueNumber: typeof attributeValue === 'number' ? attributeValue : null,
				valueBoolean: typeof attributeValue === 'boolean' ? attributeValue : null
			});
		}
	}
}
