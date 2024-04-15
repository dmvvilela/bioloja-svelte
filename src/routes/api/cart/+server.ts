/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { carts, cartItems } from '$lib/server/db/schema';
import { createId } from '$lib/server/ids';
import { error, fail, json } from '@sveltejs/kit';
import { eq, and, isNull, desc } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// Create cart or add item to it.
export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) {
		fail(401, { error: 'user is not logged in' });
	}

	const { productId } = await request.json();
	if (!productId) {
		fail(400, {
			message: 'productId is required.'
		});
	}

	try {
		// Find users cart or create a new one.
		let cartId: string | undefined;
		const cart = (
			await db
				.select()
				.from(carts)
				.where(and(eq(carts.userId, user!.id), isNull(carts.orderNumber)))
				.orderBy(desc(carts.createdAt))
		)[0];

		if (cart) {
			cartId = cart.id;
		} else {
			const cartId = createId();

			await db.insert(carts).values({
				id: cartId,
				userId: user!.id
			});
		}

		// Check if the item is already in the cart
		const cartItem = await db
			.select()
			.from(cartItems)
			.where(and(eq(cartItems.cartId, cartId!), eq(cartItems.productId, productId)));
		if (cartItem.length) {
			return json({ message: 'Item is already in the cart.' });
		}

		// Create cart item on the database
		await db.insert(cartItems).values({ cartId: cartId!, productId });

		return json(cart);
	} catch (err: any) {
		error(500, err.message);
	}
};

// Remove item from cart.
export const DELETE: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) {
		fail(401, { error: 'user is not logged in' });
	}

	const { productId } = await request.json();
	if (!productId) {
		fail(400, {
			message: 'productId is required.'
		});
	}

	try {
		// Find users cart.
		const cart = (
			await db
				.select()
				.from(carts)
				.where(and(eq(carts.userId, user!.id), isNull(carts.orderNumber)))
				.orderBy(desc(carts.createdAt))
		)[0];

		if (!cart) {
			fail(404, { message: 'Cart not found.' });
		}

		// Remove cart item from the database
		await db
			.delete(cartItems)
			.where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId)));

		return json(cart);
	} catch (err: any) {
		error(500, err.message);
	}
};
