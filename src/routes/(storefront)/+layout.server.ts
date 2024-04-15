import { db } from '$lib/server/db/conn';
import { cartItems, carts } from '$lib/server/db/schema';
import { count, eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const user = locals.user;
	let itemsCount = 0;

	// If we have a database cart, grab the item count for the header.
	if (user) {
		try {
			const result = (
				await db
					.select({ count: count() })
					.from(cartItems)
					.leftJoin(carts, eq(cartItems.cartId, carts.id))
					.where(eq(carts.userId, user.id))
			)[0];
			if (result) {
				itemsCount = result.count;
			}
		} catch (e) {
			console.error(e);
		}
	}

	return { user: locals.user, session: locals.session, cartItemsCount: itemsCount };
};
