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

		for (const subcategory of parent.subcategories) {
			await db.insert(schema.categories).values({
				parentId: parentId[0].id,
				slug: subcategory.slug,
				name: subcategory.name
			});
		}
	}

	console.log(`Seeding complete.`);
} catch (error) {
	console.error('Error performing migration: ', error);
	process.exit(1);
}
