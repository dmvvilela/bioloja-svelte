import { db } from '$lib/server/db/conn';
import { carts, type Cart } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const user = locals.user;
	const cartId = cookies.get('cartId');
	let cart: Cart | null = null;

	if (cartId) {
		const clause = user
			? and(eq(carts.userId, user.id), eq(carts.userId, user.id))
			: eq(carts.id, cartId);

		try {
			// TODO: Add cart items and save it to a svelte store
			cart = (await db.select().from(carts).where(clause))[0];
			if (!cart) {
				cookies.delete('cartId', { path: '/' });
			}
		} catch (e) {
			console.error(e);
		}
	}

	return { user: locals.user, session: locals.session, cart };
};
