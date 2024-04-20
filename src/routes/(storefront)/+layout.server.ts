import { db } from '$lib/server/db/conn';
import { cartItems, carts } from '$lib/server/db/schema';
import { count, and, eq, isNull } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies, depends }) => {
	const user = locals.user;
	let itemsCount = 0;

	// If we have a database cart, grab the item count for the header.
	depends('layout:load');
	try {
		if (user) {
			const result = (
				await db
					.select({ count: count() })
					.from(cartItems)
					.leftJoin(carts, eq(cartItems.cartId, carts.id))
					.where(and(eq(carts.userId, user.id), isNull(carts.orderNumber)))
			)[0];
			if (result) {
				itemsCount = result.count;
			}
		} else {
			// If not, try to find guest's cart
			const cartId = cookies.get('cartId');
			if (cartId) {
				const result = (
					await db
						.select({ count: count() })
						.from(cartItems)
						.leftJoin(carts, eq(cartItems.cartId, carts.id))
						.where(and(eq(carts.id, cartId), isNull(carts.orderNumber)))
				)[0];
				if (result) {
					itemsCount = result.count;
				}
			}
		}
	} catch (e) {
		console.error(e);
	}

	return { user: locals.user, session: locals.session, cartItemsCount: itemsCount };
};
