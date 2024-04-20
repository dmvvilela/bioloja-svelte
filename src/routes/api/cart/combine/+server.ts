import { db } from '$lib/server/db/conn';
import { carts } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq, and, isNull, desc, sql } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// Combine guest cart with user's cart.
export const POST: RequestHandler = async ({ locals, cookies }) => {
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
		const response = await db.execute(sql`
				INSERT INTO cart_items (cart_id, product_id, quantity)
				SELECT ${userCart.id}, product_id, quantity
				FROM cart_items
				WHERE cart_id = ${guestCart.id}
				AND NOT EXISTS (
						SELECT 1
						FROM cart_items
						WHERE cart_id = ${userCart.id} AND product_id IN (
								SELECT product_id
								FROM cart_items
								WHERE cart_id = ${guestCart.id}
						)
				)
		`);
		console.log(response);

		// Delete the guest cart.
		cookies.delete('cartId', { path: '/' });
		await db.delete(carts).where(eq(carts.id, guestCartId));

		return new Response();
	} catch (err: any) {
		error(500, err.message);
	}
};
