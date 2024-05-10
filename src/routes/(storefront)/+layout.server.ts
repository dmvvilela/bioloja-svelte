import { db } from '$lib/server/db/conn';
import { cartItems, carts, users } from '$lib/server/db/schema';
import { count, and, eq, isNull } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';
import logger from '$lib/server/logger';

export const load: LayoutServerLoad = async ({ locals, cookies, depends }) => {
	const user = locals.user;
	let itemsCount = 0;
	let userRole = 'USER';

	// If we have a database cart, grab the item count for the header.
	depends('layout:load');

	try {
		if (user) {
			const cartResult = (
				await db
					.select({ count: count() })
					.from(cartItems)
					.leftJoin(carts, eq(cartItems.cartId, carts.id))
					.where(and(eq(carts.userId, user.id), isNull(carts.orderNumber)))
			)[0];
			if (cartResult) {
				itemsCount = cartResult.count;
			}

			const roleResult = (
				await db.select({ role: users.role }).from(users).where(eq(users.id, user.id))
			)[0];
			if (roleResult) {
				userRole = roleResult.role;
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
	} catch (err: any) {
		await logger.error(err.message);
	}

	return {
		user: { ...locals.user, role: userRole },
		session: locals.session,
		cartItemsCount: itemsCount
	};
};
