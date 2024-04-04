import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { tags, categories } from '../src/lib/utils/data';
import { eq } from 'drizzle-orm';
import * as schema from '../src/lib/server/db/schema';

const sql = neon(Bun.env.PG_CONN || '');
const db = drizzle(sql);

try {
	// Insert tags
	for (const tag of tags) {
		await db.insert(schema.tags).values({ slug: tag.slug, name: tag.name });
	}

	// Insert parent categories
	// const parentCategories = categories.filter((category) => category.subcategories.length === 0);
	for (const category of categories) {
		await db.insert(schema.categories).values({ slug: category.slug, name: category.name });
	}

	// Then, insert subcategories
	const parentWithSubcategories = categories.filter(
		(category) => category.subcategories.length > 0
	);
	for (const parent of parentWithSubcategories) {
		// Get the id of the parent category
		const parentId = await db
			.select({ id: schema.categories.id })
			.from(schema.categories)
			.where(eq(schema.categories.slug, parent.slug));

		// TODO: Get correct slugs for subcategories and add to array
		for (const subcategoryName of parent.subcategories) {
			await db.insert(schema.categories).values({
				parentId: parentId[0].id,
				slug: subcategoryName.toLowerCase().replace(/ /g, '-'),
				name: subcategoryName
			});
		}
	}

	console.log(`Seeding complete.`);
} catch (error) {
	console.error('Error performing migration: ', error);
	process.exit(1);
}
