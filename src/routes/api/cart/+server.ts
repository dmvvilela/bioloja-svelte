/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { carts, cartItems, type Cart, type CartItem, type Product } from '$lib/server/db/schema';
import { createId } from '$lib/server/ids';
import { error, fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { eq, and } from 'drizzle-orm';

// Create / update cart.
export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	const user = locals.user;

	try {
		const { productId, itemPrice, itemDiscountPrice } = await request.json();
		if (!productId || !itemPrice) {
			fail(400, {
				message: 'Invalid data.'
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

		// Update cart amounts
		const amount = itemDiscountPrice || itemPrice;
		cart!.total += amount;
		cart!.subtotal += amount;

		await db
			.update(carts)
			.set({ total: cart!.total, subtotal: cart!.subtotal })
			.where(eq(carts.id, cartId));

		// Create cart item on the database
		await db.insert(cartItems).values({
			cartId,
			productId,
			itemPrice,
			itemDiscountPrice
		});

		return json(cart);

		// const price = product.discountPrice || product.price;
		// const order = {
		// 	orderNumber: cartId,
		// 	userId: user?.id,
		// 	orderSubtotal: total + price,
		// 	orderTotal: total + price
		// } as Cart;

		// // Upsert order with default type CART on db.
		// await db.insert(orders).values(order).onConflictDoUpdate({
		// 	target: orders.orderNumber,
		// 	set: order
		// });

		// const orderProduct = {
		// 	orderNumber: cartId,
		// 	productId: product.id,
		// 	itemPrice: price
		// } as CartItem;
		// await db.insert(orderProducts).values(orderProduct);
	} catch (err: any) {
		error(500, err.message);
	}
};

// SELECT
//     carts.id AS cartId,
//     carts.user_id AS userId,
//     carts.order_number AS orderNumber,
//     carts.discount AS discount,
//     carts.coupon_code AS couponCode,
//     carts.subtotal AS subtotal,
//     carts.total AS total,
//     carts.created_at AS createdAt,
//     carts.updated_at AS updatedAt,
//     array_agg(cart_items.product_id) AS itemProductIds,
//     array_agg(cart_items.line_id) AS itemLineIds,
//     array_agg(cart_items.item_price) AS itemPrices,
//     array_agg(cart_items.item_discount_price) AS itemDiscountPrices
// FROM
//     carts
// LEFT JOIN
//     cart_items ON cart_items.cart_id = carts.id
// GROUP BY
//     carts.id;
