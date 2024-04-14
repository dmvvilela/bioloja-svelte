import { db } from '$lib/server/db/conn';
import { carts, cartItems, products, coupons } from '$lib/server/db/schema';
import { sql, and, eq, isNull, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { json } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	const user = locals.user;
	let cartId = cookies.get('cartId') || '';

	// Cart will be created when an item is added.
	if (!cartId && !user?.id) {
		return json({ message: 'Cart is empty.' });
	}

	// Try to recover cart from the database
	if (!cartId && user?.id) {
		const cart = (
			await db
				.select()
				.from(carts)
				.where(and(eq(carts.userId, user.id), isNull(carts.orderNumber)))
				.orderBy(desc(carts.createdAt))
		)[0];

		if (cart) {
			cartId = cart.id;
			cookies.set('cartId', cartId, { path: '/' });
		} else {
			return json({ message: 'Cart is empty.' });
		}
	}

	const clause = user
		? and(eq(carts.id, cartId), eq(carts.userId, user?.id))
		: eq(carts.id, cartId);

	const result = (
		await db
			.select({
				cartId: carts.id,
				userId: carts.userId,
				orderNumber: carts.orderNumber,
				couponCode: carts.couponCode,
				couponExpired: sql`(SELECT expires_at IS NOT NULL AND expires_at < NOW() FROM coupons WHERE code = carts.coupon_code)`,
				couponUsed: sql`(SELECT COUNT(*) FROM orders WHERE coupon_code = carts.coupon_code) >= (SELECT max_uses FROM coupons WHERE code = carts.coupon_code)`,
				createdAt: carts.createdAt,
				updatedAt: carts.updatedAt,
				products: sql`array_agg(json_build_object(
                  'id', products.id,
                  'slug', products.slug,
                  'name', products.name,
                  'imageUrls', products.image_urls,
                  'lineId', cart_items.line_id,
                  'price', products.price,
                  'discountPrice', 
                      CASE 
                          WHEN products.discount_expires_at IS NOT NULL AND products.discount_expires_at < NOW() THEN 
                              null
                          ELSE 
                              products.discount_price
                      END
                ))`
				// itemLineIds: sql`array_agg(${cartItems.lineId})`,
				// itemPrices: sql`array_agg(${cartItems.itemPrice})`,
				// itemDiscountPrices: sql`array_agg(${cartItems.itemDiscountPrice})`
			})
			.from(carts)
			.leftJoin(cartItems, eq(cartItems.cartId, carts.id))
			.leftJoin(products, eq(products.id, cartItems.productId))
			.leftJoin(coupons, eq(coupons.code, carts.couponCode))
			.where(clause)
			.groupBy(carts.id)
	)[0];

	console.log(result);
};

// const carts = await db
//     .select('*')
//     .from(carts)
//     .leftJoin(cartItems, eq(cartItems.cartId, carts.id))
//     .leftJoin(products, eq(products.id, cartItems.productId))
//     .leftJoin(coupons, eq(coupons.code, carts.couponCode))
//     .where(clause)
//     .groupBy(carts.id);

// // Perform the calculations in JavaScript
// carts.forEach(cart => {
//     const subtotal = cart.cartItems.reduce((sum, item) => sum + (item.itemDiscountPrice || item.itemPrice), 0);
//     let discount = 0;
//     if (cart.coupon && !cart.couponExpired) {
//         if (cart.coupon.type === 'PERCENTAGE') {
//             discount = Math.round(subtotal * cart.coupon.value / 100);
//         } else if (cart.coupon.type === 'FIXED_AMOUNT') {
//             discount = cart.coupon.value;
//         }
//     }
//     cart.subtotal = subtotal;
//     cart.discount = discount;
//     cart.total = subtotal - discount;
// });
