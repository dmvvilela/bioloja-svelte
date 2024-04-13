/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import {
	orderProducts,
	orders,
	type Order,
	type OrderProduct,
	type Product
} from '$lib/server/db/schema';
import { createOrderId } from '$lib/server/ids';
import { error, fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Create / update cart.
export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	const user = locals.user;

	try {
		const product: Product = await request.json();
		if (!product) {
			fail(400, {
				message: 'Product is required.'
			});
		}

		if (!user) {
			const anonymousCart = cookies.get('anonymousCart');
			const cart = anonymousCart ? JSON.parse(anonymousCart) : { orderProducts: [] };
			cart.orderProducts.push(product);
			cookies.set('anonymousCart', JSON.stringify(cart), { path: '/' });

			return json(cart);
		}

		let cartId = cookies.get('cartId');
		if (!cartId) {
			cartId = await createOrderId();
			cookies.set('cartId', cartId, { path: '/' });
		}

		const price = product.discountPrice || product.price;
		const order = {
			orderNumber: cartId,
			userId: user?.id,
			orderSubtotal: price,
			orderTotal: price
		} as Order;

		// Upsert order with default type CART on db.
		await db.insert(orders).values(order).onConflictDoUpdate({
			target: orders.orderNumber,
			set: order
		});

		const orderProduct = {
			orderNumber: cartId,
			productId: product.id,
			itemPrice: price
		} as OrderProduct;
		await db.insert(orderProducts).values(order).onConflictDoUpdate({
			target: orders.orderNumber,
			set: order
		});

		return json({ success: true });
	} catch (err: any) {
		error(500, err.message);
	}
};
