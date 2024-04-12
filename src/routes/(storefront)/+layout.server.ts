import { db } from '$lib/server/db/conn';
import { orders, type Orders } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const cartId = cookies.get('cartId');
	let cart: Orders | null = null;

	if (cartId) {
		try {
			cart = (
				await db
					.select()
					.from(orders)
					.where(and(eq(orders.orderNumber, cartId), eq(orders.orderStatus, 'CART')))
			)[0];

			if (!cart) {
				cookies.delete('cartId', { path: '/' });
			}
		} catch (e) {
			console.error(e);
		}
	}

	return { user: locals.user, session: locals.session, cart };
};
