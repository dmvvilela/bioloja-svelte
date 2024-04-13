/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { orders, type Order } from '$lib/server/db/schema';
import { createOrderId } from '$lib/server/ids';
import { error, fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Create / update cart.
export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	const user = locals.user;
	let { item } = await request.json();
	let cartId = cookies.get('cartId');

	if (!item) {
		fail(400, {
			message: 'Item is required.'
		});
	}

	if (!user) {
		let anonCart = cookies.get('anonCart') || '';
		const cart = JSON.parse(anonCart);
	}

	item = JSON.parse(item);

	// TODO: check if user is logged in.. if not create an anonymius cart cookie.. only created on the db when user is registered...
	// Create new order with status of cart if needed
	if (!cartId) {
		cartId = await createOrderId();
		const price = item.discountPrice || item.price;

		const order = {
			orderNumber: cartId,
			userId: item.userId,
			orderSubtotal: price,
			orderTotal: price
		} as Order;

		await db.insert(orders).values(order).onConflictDoUpdate({
			target: orders.orderNumber,
			set: order
		});

		cookies.set('cartId', cartId, { path: '/' });
	}

	// create order.. then just add order items.. thats why sql is normalized...

	try {
		await db.insert(orders).values(order).onConflictDoUpdate({
			target: orders.orderNumber,
			set: order
		});

		return json({ success: true });
	} catch (err: any) {
		error(500, err.message);
	}
};
