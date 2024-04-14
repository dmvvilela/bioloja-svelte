import { db } from '$lib/server/db/conn';
import { cartItems, carts } from '$lib/server/db/schema';
import { count, and, eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const user = locals.user;
	const cartId = cookies.get('cartId');
	let itemsCount = 0;

	if (cartId) {
		// TODO: maybe grab the cart to ensure the userid matches?
		const clause = user
			? and(eq(carts.userId, user.id), eq(carts.userId, user.id))
			: eq(carts.id, cartId);

		try {
			// TODO: Add cart items and save it to a svelte store
			// TODO: invalidate data (maybe cart needs to depend on here cause here it might delete cartId)
			const result = (
				await db.select({ count: count() }).from(cartItems).where(eq(cartItems.cartId, cartId))
			)[0];
			if (!result) {
				cookies.delete('cartId', { path: '/' });
			} else {
				itemsCount = result.count;
			}
		} catch (e) {
			console.error(e);
		}
	}

	return { user: locals.user, session: locals.session, cartItemsCount: itemsCount };
};
