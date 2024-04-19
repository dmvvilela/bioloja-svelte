import { db } from '$lib/server/db/conn';
import { categories, productCategories, products } from '$lib/server/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { categories as categoriesArray } from '$lib/utils/data';
import type { ProductType } from '$lib/utils/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, url }) => {
	const slugs = params.slugs.split('/');
	let categorySlug, parentCategorySlug;

	if (slugs.length > 0) categorySlug = slugs[0];
	if (slugs.length > 1) parentCategorySlug = slugs[1];

	const parentCategory = alias(categories, 'parentCategory');

	let whereConditions;
	if (parentCategorySlug && categorySlug) {
		whereConditions = and(
			eq(products.published, true),
			eq(categories.slug, categorySlug),
			eq(parentCategory.slug, parentCategorySlug)
		);
	} else if (categorySlug) {
		whereConditions = and(eq(products.published, true), eq(categories.slug, categorySlug));
	}

	const pageSize = 8;
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
			parentCategorySlug: parentCategory.slug
		})
		.from(products)
		.innerJoin(productCategories, eq(productCategories.productId, products.id))
		.innerJoin(categories, eq(categories.id, productCategories.categoryId))
		.leftJoin(parentCategory, eq(parentCategory.id, categories.parentId))
		.where(whereConditions)
		.orderBy(desc(products.updatedAt))
		.limit(pageSize)
		.offset(offset)
		.execute()) as ProductType[];
	// console.log(categoryProducts);

	let parentCategoryName, subcategoryName;
	for (const category of categoriesArray) {
		if (category.slug === categorySlug) {
			subcategoryName = category.name;
			if (parentCategorySlug) {
				for (const subcategory of category.subcategories) {
					if (subcategory.slug === parentCategorySlug) {
						parentCategoryName = subcategory.name;
						break;
					}
				}
			}
			break;
		}
	}

	return {
		category: {
			category: parentCategoryName,
			subcategory: subcategoryName,
			products: categoryProducts
		}
	};
}) satisfies PageServerLoad;
