/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { categories, productCategories, products } from '$lib/server/db/schema';
import { isNull, isNotNull, not, sql, desc, eq, and } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const parentCategory = alias(categories, 'parentCategory');
	const promotions = await db
		.select({
			productId: products.id,
			productName: products.name,
			imageUrls: products.imageUrls,
			price: products.price,
			discountPrice: products.discountPrice,
			discountExpiresAt: products.discountExpiresAt,
			categoryId: productCategories.categoryId,
			categoryName: categories.name,
			parentCategoryId: parentCategory.id,
			parentCategoryName: parentCategory.name
		})
		.from(products)
		.fullJoin(productCategories, eq(productCategories.productId, products.id))
		.fullJoin(categories, eq(categories.id, productCategories.categoryId))
		.leftJoin(parentCategory, eq(parentCategory.id, categories.parentId))
		.where(and(isNotNull(products.discountPrice), eq(products.published, true)))
		.orderBy(sql`RANDOM()`) // desc(products.updatedAt))
		.limit(8)
		.execute();

	const bestSellers = await db
		.select({
			productId: products.id,
			productName: products.name,
			imageUrls: products.imageUrls,
			price: products.price,
			discountPrice: products.discountPrice,
			discountExpiresAt: products.discountExpiresAt,
			categoryId: productCategories.categoryId,
			categoryName: categories.name,
			parentCategoryId: parentCategory.id,
			parentCategoryName: parentCategory.name
		})
		.from(products)
		.fullJoin(productCategories, eq(productCategories.productId, products.id))
		.fullJoin(categories, eq(categories.id, productCategories.categoryId))
		.leftJoin(parentCategory, eq(parentCategory.id, categories.parentId))
		.where(and(isNull(products.discountPrice), eq(products.published, true)))
		.orderBy(sql`RANDOM()`) // desc(products.updatedAt))
		.limit(8)
		.execute();

	console.log(bestSellers);

	return { promotions, bestSellers };
}) satisfies PageServerLoad;
