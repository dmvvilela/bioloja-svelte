import { db } from '$lib/server/db/conn';
import { cartItems, carts } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq, and, isNull, desc, sql } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import logger from '$lib/server/logger';

// Combine guest cart with user's cart.
export const POST: RequestHandler = async ({ locals, cookies, fetch }) => {
	const user = locals.user;
	const guestCartId = cookies.get('cartId');

	if (!user) {
		error(401, {
			message: 'Dados inválidos.'
		});
	}
	if (!guestCartId) {
		return new Response(); // Nothing to do..
	}

	try {
		// Find both carts.
		const guestCart = (
			await db
				.select()
				.from(carts)
				.where(and(eq(carts.id, guestCartId), isNull(carts.orderNumber)))
				.orderBy(desc(carts.createdAt))
		)[0];
		if (!guestCart) {
			// Nothing to do.. Will grab user's cart anyway..
			return new Response();
		}

		const userCart = (
			await db
				.select()
				.from(carts)
				.where(and(eq(carts.userId, user!.id), isNull(carts.orderNumber)))
				.orderBy(desc(carts.createdAt))
		)[0];
		if (!userCart) {
			// Grab the guest cart and make it the user's cart.
			cookies.delete('cartId', { path: '/' });
			await db.update(carts).set({ userId: user!.id }).where(eq(carts.id, guestCart.id));
			return new Response();
		}

		// Both cart exists, copy items from guest to user.
		await db.execute(sql`
				INSERT INTO cart_items (cart_id, product_id)
				SELECT ${userCart.id}, product_id
				FROM cart_items
				WHERE cart_id = ${guestCart.id}
				AND product_id NOT IN (
						SELECT product_id
						FROM cart_items
						WHERE cart_id = ${userCart.id}
				)
		`);

		// If there was a coupon envolved, we apply them to see if it still works.
		if (guestCart.couponCode || userCart.couponCode) {
			// WHERE cart_id IN (${userCart.id}, ${guestCart.id})
			const subtotal = (
				await db.execute(sql`
					SELECT cart_id, SUM(COALESCE((CASE WHEN discount_expires_at IS NULL OR discount_expires_at > NOW() THEN discount_price END), price)) as subtotal
					FROM cart_items
					JOIN products ON cart_items.product_id = products.id
					WHERE cart_id = ${userCart.id}
					GROUP BY cart_id
			`)
			).rows[0].subtotal;

			// TODO: we could fetch both to see which is better.. but that sounds like too much for now..
			try {
				await fetch(`/api/cart/coupon`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						cartId: userCart.id,
						couponCode: guestCart.couponCode || userCart.couponCode,
						subtotal: subtotal
					})
				});
			} catch (e) {
				/* empty */
			}
		}

		// Delete the guest cart.
		cookies.delete('cartId', { path: '/' });
		await db.delete(cartItems).where(eq(cartItems.cartId, guestCart.id));
		await db.delete(carts).where(eq(carts.id, guestCartId));

		return new Response();
	} catch (err: any) {
		await logger.error(err.message);
		await logger.error(`/api/cart/combine -> userId: ${user?.id}, guestCartId: ${guestCartId}`);
		error(500, err.message);
	}
};
