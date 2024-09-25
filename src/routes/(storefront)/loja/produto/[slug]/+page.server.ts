import { db } from '$lib/server/db/conn';
import { eq, and, inArray, ne, sql } from 'drizzle-orm';
import {
	attributes,
	categories,
	productAttributes,
	productCategories,
	productTags,
	products,
	tags
} from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import type { ProductWithCategories } from '$lib/utils/types';
import { error, redirect } from '@sveltejs/kit';
import logger from '$lib/server/logger';
import { searchProduct } from '$lib/utils/algolia';

export const load = (async ({ params }) => {
	// If the search query ends with .bullshit it means that bots are trying to find vulnerabilities
	if (params.slug.endsWith('.css') || params.slug.endsWith('.php')) {
		error(400, 'Produto não encontrado.');
	}

	// const product = (await db.select().from(products).where(eq(products.slug, params.slug)))[0];

	// const product = (
	// 	await db
	// 		.select({
	// 			id: products.id,
	// 			name: products.name,
	// 			slug: products.slug,
	// 			imageUrls: products.imageUrls,
	// 			price: products.price,
	// 			discountPrice: products.discountPrice,
	// 			discountExpiresAt: products.discountExpiresAt,
	// 			categoryName: categories.name,
	// 			categorySlug: categories.slug
	// 		})
	// 		.from(products)
	// 		.innerJoin(productCategories, eq(productCategories.productId, products.id))
	// 		.innerJoin(categories, eq(categories.id, productCategories.categoryId))
	// 		.where(eq(products.slug, params.slug))
	// )[0];

	const product = (
		await db.execute(sql`
				SELECT products.*, array_agg(categories.name) as category_names, array_agg(categories.slug) as category_slugs, array_agg(categories.id) as category_ids
				FROM products
				INNER JOIN product_categories ON products.id = product_categories.product_id
				INNER JOIN categories ON product_categories.category_id = categories.id
				WHERE products.slug = ${params.slug}
				GROUP BY products.id
		`)
	).rows[0] as ProductWithCategories;

	if (!product) {
		const searched: any = await searchProduct(params.slug);
		if (!searched.length) {
			await logger.error('Product not found: ' + params.slug);
			error(404, 'Produto não encontrado.');
		}

		redirect(301, `/loja/produto/${searched[0].slug}`);
	}

	const qtags = await db
		.select({ name: tags.name, slug: tags.slug })
		.from(tags)
		.innerJoin(productTags, eq(productTags.tagId, tags.id))
		.where(eq(productTags.productId, product.id));

	const qattributes = await db
		.select({
			name: attributes.name,
			slug: attributes.slug,
			type: attributes.dataType,
			valueText: productAttributes.valueText,
			valueNumber: productAttributes.valueNumber,
			valueBoolean: productAttributes.valueBoolean
		})
		.from(attributes)
		.innerJoin(productAttributes, eq(productAttributes.attributeId, attributes.id))
		.where(eq(productAttributes.productId, product.id));

	const relatedProducts = await db
		.select()
		.from(products)
		.innerJoin(productCategories, eq(productCategories.productId, products.id))
		.innerJoin(categories, eq(productCategories.categoryId, categories.id))
		.where(
			and(inArray(productCategories.categoryId, product.category_ids), ne(products.id, product.id))
		)
		.limit(4);

	return { product, relatedProducts, tags: qtags, attributes: qattributes };
}) satisfies PageServerLoad;

// If needed more categories try this..
// const relatedProducts = await db
//     .select()
//     .from(products)
//     .innerJoin(productCategories, eq(productCategories.productId, products.id))
//     .where(and(inArray(productCategories.categoryId, product.category_ids), ne(products.id, product.id)))
//     .limit(4);

// const relatedProductsWithCategories = await Promise.all(relatedProducts.map(async (product) => {
//     const categories = await db.select()
//         .from(categories)
//         .innerJoin(productCategories, eq(productCategories.categoryId, categories.id))
//         .where(eq(productCategories.productId, product.id));

//     return {
//         ...product,
//         categories
//     };
// }));
