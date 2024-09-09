/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { categories, productCategories, products } from '$lib/server/db/schema';
import { isNotNull, sql, eq, and } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import type { ProductType } from '$lib/types/product';
import type { PageServerLoad } from './$types';

// TODO: Cache this
export const load = (async ({ setHeaders }) => {
	// setHeaders({ 'cache-control': 'max-age=3600' });
	const parentCategory = alias(categories, 'parentCategory');
	const promotions = (await db
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
		.where(and(isNotNull(products.discountPrice), eq(products.published, true)))
		.orderBy(sql`RANDOM()`) // desc(products.updatedAt))
		.limit(8)
		.execute()) as ProductType[];

	// const bestSellers = (await db
	// 	.select({
	// 		productId: products.id,
	// 		productName: products.name,
	// 		productSlug: products.slug,
	// 		imageUrls: products.imageUrls,
	// 		price: products.price,
	// 		discountPrice: products.discountPrice,
	// 		discountExpiresAt: products.discountExpiresAt,
	// 		categoryId: productCategories.categoryId,
	// 		categoryName: categories.name,
	// 		categorySlug: categories.slug,
	// 		parentCategoryId: parentCategory.id,
	// 		parentCategoryName: parentCategory.name,
	// 		parentCategorySlug: parentCategory.slug
	// 	})
	// 	.from(products)
	// 	.innerJoin(productCategories, eq(productCategories.productId, products.id))
	// 	.innerJoin(categories, eq(categories.id, productCategories.categoryId))
	// 	.leftJoin(parentCategory, eq(parentCategory.id, categories.parentId))
	// 	.where(and(isNull(products.discountPrice), eq(products.published, true)))
	// 	.orderBy(sql`RANDOM()`) // desc(products.updatedAt))
	// 	.limit(8)
	// 	.execute()) as ProductType[];

	const bestSellers = (
		await db.execute(
			sql`WITH ranked_categories AS (
							SELECT 
									product_id AS "productId", 
									category_id AS "categoryId", 
									ROW_NUMBER() OVER(PARTITION BY product_id ORDER BY category_id) AS row_number
							FROM product_categories
					)

					SELECT 
							products.id AS "productId",
							products.name AS "productName",
							products.slug AS "productSlug",
							products.image_urls AS "imageUrls",
							products.price AS "price",
							products.discount_price AS "discountPrice",
							products.discount_expires_at AS "discountExpiresAt",
							categories.id AS "categoryId",
							categories.name AS "categoryName",
							categories.slug AS "categorySlug",
							parent_category.id AS "parentCategoryId",
							parent_category.name AS "parentCategoryName"
					FROM 
							products
					INNER JOIN order_products ON order_products.product_id = products.id
					INNER JOIN ranked_categories ON ranked_categories."productId" = products.id
					LEFT JOIN categories ON categories.id = ranked_categories."categoryId"
					LEFT JOIN categories AS parent_category ON parent_category.id = categories.parent_id
					WHERE ranked_categories.row_number = 1
					GROUP BY 
							products.id,
							categories.id, 
							parent_category.id, 
							parent_category.name
					ORDER BY COUNT(order_products.order_number) DESC
					LIMIT 8;`
		)
	).rows;

	return { promotions, bestSellers };
}) satisfies PageServerLoad;
