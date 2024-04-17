/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { categories, productCategories, products } from '$lib/server/db/schema';
import { isNull, isNotNull, not, sql, desc, eq, and } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import type { PageServerLoad } from './$types';
import type { ProductType } from '$lib/utils/types';

export const load = (async ({ setHeaders }) => {
	// setHeaders({ 'cache-control': 'max-age=3600' });
	const parentCategory = alias(categories, 'parentCategory');
	const storeProducts = (await db
		.select({
			productId: products.id,
			productSlug: products.slug,
			productName: products.name,
			imageUrls: products.imageUrls,
			price: products.price,
			discountPrice: products.discountPrice,
			discountExpiresAt: products.discountExpiresAt,
			categoryId: productCategories.categoryId,
			categoryName: categories.name,
			categorySlug: categories.slug,
			parentCategoryId: parentCategory.id,
			parentCategoryName: parentCategory.name
		})
		.from(products)
		.innerJoin(productCategories, eq(productCategories.productId, products.id))
		.innerJoin(categories, eq(categories.id, productCategories.categoryId))
		.leftJoin(parentCategory, eq(parentCategory.id, categories.parentId))
		.where(and(isNotNull(products.discountPrice), eq(products.published, true)))
		.orderBy(sql`RANDOM()`) // desc(products.updatedAt))
		.limit(8)
		.execute()) as ProductType[];

	return { storeProducts };
}) satisfies PageServerLoad;
