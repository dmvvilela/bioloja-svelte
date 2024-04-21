import algoliasearch from 'algoliasearch';
import { db } from './utils/database';
import {
	attributes,
	categories,
	productAttributes,
	productCategories,
	productTags,
	products,
	tags
} from '../../src/lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';

// Connect and authenticate with your Algolia app
// const client = algoliasearch(Bun.env.ALGOLIA_APP_ID || '', Bun.env.ALGOLIA_API_KEY || '');

// // Create a new index and add a record
// const index = client.initIndex('products');

const records: any = [];

// Get all products
const qproducts = await db
	.select({
		id: products.id,
		slug: products.slug,
		name: products.name,
		published: products.published,
		featured: products.featured,
		shortDescription: products.shortDescription,
		description: products.description,
		price: products.price,
		discountPrice: products.discountPrice,
		discountExpiresAt: products.discountExpiresAt,
		imageUrls: products.imageUrls
	})
	.from(products);

// For each product, get categories and add them to the record
for (const product of qproducts) {
	const record: any = product; // init record
	record.objectID = customAlphabet('123467890ABCDEFGHJKLMNPQRTUVWXYZ', 8)();

	const qcategories = await db
		.select({
			id: categories.id,
			slug: categories.slug,
			name: categories.name
		})
		.from(categories)
		.innerJoin(productCategories, eq(productCategories.categoryId, categories.id))
		.where(eq(productCategories.productId, product.id));

	// Add categories to the record
	record.categories = qcategories;
	// console.log(record.categories);

	// Similarly, for each product, get tags and add them to the record
	const qtags = await db
		.select({
			id: tags.id,
			slug: tags.slug,
			name: tags.name
		})
		.from(tags)
		.innerJoin(productTags, eq(productTags.tagId, tags.id))
		.where(eq(productTags.productId, product.id));

	// Add tags to the product record
	record.tags = qtags;
	// console.log(record.tags);

	// Similarly, for each product, get attributes and add them to the record
	const qattributes = await db
		.select({
			id: attributes.id,
			slug: attributes.slug,
			name: attributes.name,
			valueText: productAttributes.valueText,
			valueNumber: productAttributes.valueNumber,
			valueBoolean: productAttributes.valueBoolean
		})
		.from(attributes)
		.innerJoin(productAttributes, eq(productAttributes.attributeId, attributes.id))
		.where(eq(productAttributes.productId, product.id));

	// Add attributes to the product record
	record.attributes = qattributes;
	// console.log(record.attributes);

	// Flatten categories into an array of names
	// record.categories = record.categories.map((category: any) => category.name);

	// Flatten tags into an array of names
	record.tags = record.tags.map((tag: any) => tag.name);

	// Flatten attributes into an object with attribute names as keys and values as values
	record.attributes = record.attributes.reduce((acc: any, attribute: any) => {
		acc[attribute.name] = attribute.valueText || attribute.valueNumber || attribute.valueBoolean;
		return acc;
	}, {});

	// Convert imageUrls into an array
	record.imageUrls = product.imageUrls.split(',').map((url) => url.trim());

	records.push(record);
}

// console.log(records);
await Bun.write('./data/algolia_products.json', JSON.stringify(records));

// await index.saveObjects(records, {
//   autoGenerateObjectIDIfNotExist: true
// });

// const record = { objectID: 1, name: 'test_record' };
// index.saveObject(record).wait();

// // Search the index and print the results
// index.search('test_record').then(({ hits }) => console.log(hits[0]));
