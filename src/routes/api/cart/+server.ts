import { db } from '$lib/server/db/conn';
import { carts, cartItems } from '$lib/server/db/schema';
import { createId } from '$lib/server/ids';
import { error, json } from '@sveltejs/kit';
import { eq, and, isNull, desc } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// Create cart if needed and add item to it.
export const POST: RequestHandler = async ({ request, locals, cookies }) => {
	const user = locals.user;
	const { productId } = await request.json();
	if (!productId) {
		error(400, {
			message: 'productId is required.'
		});
	}

	try {
		let cartId;
		let newCart = false;

		// Try to find user's cart
		if (user) {
			const cart = (
				await db
					.select()
					.from(carts)
					.where(and(eq(carts.userId, user!.id), isNull(carts.orderNumber)))
					.orderBy(desc(carts.createdAt))
			)[0];

			if (cart) {
				cartId = cart.id;
			}
		} else {
			// Try to find guest's cart
			cartId = cookies.get('cartId');
		}

		// Create a new cart if needed
		if (!cartId) {
			cartId = createId();
			newCart = true;

			if (!user) {
				cookies.set('cartId', cartId, { path: '/' });
			}

			await db.insert(carts).values({
				id: cartId,
				userId: user?.id
			});
		}

		// Check if the item is already in the cart
		if (!newCart) {
			const cartItem = await db
				.select()
				.from(cartItems)
				.where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)));
			if (cartItem.length) {
				return json({ message: 'Produto já adicionado.', exists: true });
			}
		}

		// Create cart item on the database
		await db.insert(cartItems).values({ cartId, productId });

		return json({ message: 'Produto adicionado!' });
	} catch (err: any) {
		error(500, err.message);
	}
};

// Remove item from cart.
export const DELETE: RequestHandler = async ({ request, locals, cookies }) => {
	const user = locals.user;
	const { productId } = await request.json();
	if (!productId) {
		error(400, {
			message: 'productId is required.'
		});
	}

	try {
		let cartId;

		// Try to find user's cart
		if (user) {
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
				error(404, { message: 'Carrinho não encontrado.' });
			}
		} else {
			// Try to find guest's cart
			cartId = cookies.get('cartId');
			if (!cartId) {
				error(404, { message: 'Carrinho não encontrado.' });
			}

			const cart = (
				await db
					.select()
					.from(carts)
					.where(and(eq(carts.id, cartId), isNull(carts.orderNumber)))
					.orderBy(desc(carts.createdAt))
			)[0];

			if (!cart) {
				error(404, { message: 'Carrinho não encontrado.' });
			}
		}

		// Remove cart item from the database
		await db
			.delete(cartItems)
			.where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)));

		return json({ success: true });
	} catch (err: any) {
		error(500, err.message);
	}
};
