import { error, fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/conn';
import { products } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
	const { id: productId } = params;
	if (!productId) {
		fail(400, {
			message: 'productId is required.'
		});
	}

	try {
		const product = (
			await db
				.select({
					id: products.id,
					name: products.name,
					slug: products.slug,
					categories: sql`(
									SELECT array_agg(categories.name) 
									FROM product_categories 
									JOIN categories ON categories.id = product_categories.category_id 
									WHERE product_categories.product_id = products.id
							)`,
					price: products.price,
					discountPrice: sql`
									CASE 
											WHEN products.discount_expires_at IS NOT NULL AND products.discount_expires_at < NOW() THEN 
													null
											ELSE 
													products.discount_price
									END`,
					imageUrls: products.imageUrls
				})
				.from(products)
				.where(eq(products.id, parseInt(productId)))
		)[0];

		return json(product);
	} catch (err) {
		error(500, 'Ocorreu um erro. Tente mais tarde.');
	}
	return new Response();
};
