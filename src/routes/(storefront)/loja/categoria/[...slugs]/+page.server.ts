import { db } from '$lib/server/db/conn';
import { categories, productCategories, products } from '$lib/server/db/schema';
import { eq, and, isNull, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { alias } from 'drizzle-orm/pg-core';
import type { ProductType } from '$lib/utils/types';

export const load = (async ({ params }) => {
	console.log(params);
	const slugs = params.slugs.split('/');
	let category, subcategory;

	if (slugs.length > 0) category = slugs[0];
	if (slugs.length > 1) subcategory = slugs[1];

	const parentCategory = alias(categories, 'parentCategory');
	const categoryProducts = (await db
		.select({
			productId: products.id,
			productName: products.name,
			productSlug: products.slug,
			imageUrls: products.imageUrls,
			price: products.price,
			discountPrice: products.discountPrice,
			discountExpiresAt: products.discountExpiresAt,
			categoryId: productCategories.categoryId,
			categoryName: categories.name,
			categorySlug: categories.slug,
			parentCategoryId: parentCategory.id,
			parentCategoryName: parentCategory.name,
			parentCategorySlug: parentCategory.slug
		})
		.from(products)
		.innerJoin(productCategories, eq(productCategories.productId, products.id))
		.innerJoin(categories, eq(categories.id, productCategories.categoryId))
		.leftJoin(parentCategory, eq(parentCategory.id, categories.parentId))
		.where(and(isNull(products.discountPrice), eq(products.published, true)))
		.orderBy(sql`RANDOM()`) // desc(products.updatedAt))
		.limit(8)
		.execute()) as ProductType[];

	return {};
}) satisfies PageServerLoad;
