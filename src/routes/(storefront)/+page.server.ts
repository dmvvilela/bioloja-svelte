/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { categories, productCategories, products } from '$lib/server/db/schema';
import { isNotNull, desc, eq, and } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// const promotions = await db
	// 	.select()
	// 	.from(products)
	// 	.where(isNotNull(products.discountPrice))
	// 	.orderBy(desc(products.discountExpiresAt))
	// 	.limit(4);

	// This query may grab duplicates (parent category)
	const parentCategory = alias(categories, 'parentCategory');
	const promotions = await db
		.select({
			productId: products.id,
			productName: products.name,
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
		// .orderBy(desc(products.updatedAt))
		.limit(8) // Fetch double the products
		.execute();

	// Remove duplicates, keeping the ones with a parent category
	const uniqueProductsWithParentCategory: any = [];
	promotions.forEach((product) => {
		const existingProductIndex = uniqueProductsWithParentCategory.findIndex(
			(p: any) => p.productId === product.productId
		);
		if (existingProductIndex === -1) {
			// If the product is not already in the array, add it
			uniqueProductsWithParentCategory.push(product);
		} else if (product.parentCategoryId !== null) {
			// If the product is already in the array and this product has a parent category, replace the existing product
			uniqueProductsWithParentCategory[existingProductIndex] = product;
		}
	});

	// Ensure you have the correct number of products
	const filteredProducts = uniqueProductsWithParentCategory.slice(0, 4);

	return { promotions: filteredProducts };
}) satisfies PageServerLoad;
