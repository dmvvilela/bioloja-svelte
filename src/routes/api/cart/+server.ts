/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { orders } from '$lib/server/db/schema';
import { createOrderId } from '$lib/server/ids';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Create / update cart.
export const POST: RequestHandler = async ({ request, cookies }) => {
	const { order } = await request.json();
	let cartId = cookies.get('cartId');

	// Create new order with status of cart if needed
	if (!cartId) {
		cartId = await createOrderId();
		cookies.set('cartId', cartId, { path: '/' });
	}

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
