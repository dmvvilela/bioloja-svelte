/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { carts, cartItems, type Cart } from '$lib/server/db/schema';
import { createId } from '$lib/server/ids';
import { error, fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { eq, and } from 'drizzle-orm';

// Create cart or add item to it.
export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	const user = locals.user;

	try {
		const { productId } = await request.json();
		if (!productId) {
			fail(400, {
				message: 'productId is required.'
			});
		}

		let cartId = cookies.get('cartId') || '';
		let cart: Cart | undefined;
		if (!cartId.length) {
			cartId = createId();
			cookies.set('cartId', cartId, { path: '/' });

			// Create a new cart on the database
			cart = {
				id: cartId,
				userId: user?.id || null
			} as Cart;

			await db.insert(carts).values(cart);
		} else {
			// Check if the item is already in the cart
			const cartItem = await db
				.select()
				.from(cartItems)
				.where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)));
			if (cartItem.length) {
				return json({ message: 'Item is already in the cart.' });
			}

			// Fetch the existing cart from the database
			cart = (await db.select().from(carts).where(eq(carts.id, cartId)))[0];
			if (!cart) {
				cookies.delete('cartId', { path: '/' });

				fail(404, {
					message: 'Cart not found.'
				});
			}
		}

		// Create cart item on the database
		await db.insert(cartItems).values({ cartId, productId });

		return json(cart);
	} catch (err: any) {
		error(500, err.message);
	}
};

// Remove item from cart.
export const DELETE: RequestHandler = async ({ request, cookies, locals }) => {
	const user = locals.user;

	try {
		const { productId } = await request.json();
		if (!productId) {
			fail(400, {
				message: 'productId is required.'
			});
		}

		let cartId = cookies.get('cartId') || '';
		let cart: Cart | undefined;
		if (!cartId.length) {
			cartId = createId();
			cookies.set('cartId', cartId, { path: '/' });

			// Create a new cart on the database
			cart = {
				id: cartId,
				userId: user?.id || null
			} as Cart;

			await db.insert(carts).values(cart);
		} else {
			// Check if the item is already in the cart
			const cartItem = await db
				.select()
				.from(cartItems)
				.where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)));
			if (cartItem.length) {
				return json({ message: 'Item is already in the cart.' });
			}

			// Fetch the existing cart from the database
			cart = (await db.select().from(carts).where(eq(carts.id, cartId)))[0];
			if (!cart) {
				cookies.delete('cartId', { path: '/' });

				fail(404, {
					message: 'Cart not found.'
				});
			}
		}

		// Create cart item on the database
		await db.insert(cartItems).values({ cartId, productId });

		return json(cart);
	} catch (err: any) {
		error(500, err.message);
	}
};
