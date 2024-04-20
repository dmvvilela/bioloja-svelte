import { db } from '$lib/server/db/conn';
import { categories, productCategories, products } from '$lib/server/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { categories as categoriesArray } from '$lib/utils/data';
import type { ProductType } from '$lib/types/product';
import type { PageServerLoad } from './$types';

export type ProductWithCount = ProductType & { totalCount: number };

export const load = (async ({ params, url }) => {
	const slugs = params.slugs.split('/');
	let categorySlug, subcategorySlug;

	if (slugs.length > 0) categorySlug = slugs[0];
	if (slugs.length > 1) subcategorySlug = slugs[1];

	const parentCategory = alias(categories, 'parentCategory');

	let whereConditions;
	if (subcategorySlug && categorySlug) {
		whereConditions = and(
			eq(products.published, true),
			eq(parentCategory.slug, categorySlug),
			eq(categories.slug, subcategorySlug)
		);
	} else if (categorySlug) {
		whereConditions = and(eq(products.published, true), eq(categories.slug, categorySlug));
	}
	const pageSize = 16;
	const pageNumber = parseInt(url.searchParams.get('page') || '1');
	const offset = (pageNumber - 1) * pageSize;

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
			parentCategorySlug: parentCategory.slug,
			totalCount: sql`COUNT(*) OVER()`
		})
		.from(products)
		.innerJoin(productCategories, eq(productCategories.productId, products.id))
		.innerJoin(categories, eq(categories.id, productCategories.categoryId))
		.leftJoin(parentCategory, eq(parentCategory.id, categories.parentId))
		.where(whereConditions)
		.orderBy(desc(products.updatedAt))
		.limit(pageSize)
		.offset(offset)
		.execute()) as ProductWithCount[];
	// console.log(categoryProducts);

	let categoryName, subcategoryName;
	for (const category of categoriesArray) {
		if (category.slug === categorySlug) {
			categoryName = category.name;
			if (subcategorySlug) {
				for (const subcategory of category.subcategories) {
					if (subcategory.slug === subcategorySlug) {
						subcategoryName = subcategory.name;
						break;
					}
				}
			}
			break;
		}
	}

	const totalCount = categoryProducts.length > 0 ? Number(categoryProducts[0].totalCount) : 0;
	const totalPages = Math.ceil(totalCount / pageSize);

	return {
		category: {
			categorySlug,
			subcategorySlug,
			categoryName,
			subcategoryName,
			pageNumber,
			totalPages,
			products: categoryProducts
		}
	};
}) satisfies PageServerLoad;
