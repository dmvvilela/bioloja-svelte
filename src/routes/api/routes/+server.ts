import { error, json } from '@sveltejs/kit';
import { db } from '$lib/server/db/conn';
import { categories, products } from '$lib/server/db/schema';
import { alias } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	const routes: string[] = [];

	try {
		// Query the database for all product slugs
		const productSlugs = await db.select({ slug: products.slug }).from(products);

		// Query the database for all category slugs
		const parentCategory = alias(categories, 'parentCategory');
		const categorySlugs = await db
			.select({
				categorySlug: categories.slug,
				parentSlug: parentCategory.slug
			})
			.from(categories)
			.leftJoin(parentCategory, eq(parentCategory.id, categories.parentId));

		// Generate the URLs for the categories and products
		const urls = [
			...productSlugs.map((product) => `/loja/produto/${product.slug}`),
			...categorySlugs.map((category) => {
				let url = '/loja/categoria/';
				if (category.parentSlug) {
					url += `${category.parentSlug}/`;
				}
				url += category.categorySlug;
				return url;
			})
		];

		routes.push(...urls);

		// Removing categories with no products to avoid soft 404 on google
		const filtered = routes.filter(
			(route) =>
				!route.endsWith('/loja/categoria/patologia') &&
				!route.endsWith('/loja/categoria/embriologia')
		);

		return json(filtered);
	} catch (err) {
		console.log(err);
		return error(500, 'Ocorreu um erro ao buscar as rotas.');
	}
}) satisfies RequestHandler;
