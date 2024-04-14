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
				discount: carts.discount,
				couponCode: carts.couponCode,
				couponExpired: sql`(SELECT expires_at IS NOT NULL AND expires_at < NOW() FROM coupons WHERE code = carts.coupon_code)`,
				// couponExpired: sql`COALESCE((SELECT expires_at IS NOT NULL AND expires_at < NOW() FROM coupons WHERE code = carts.coupon_code), false)`,
				subtotal:
					sql`SUM(COALESCE(${cartItems.itemDiscountPrice}, ${cartItems.itemPrice}))`.mapWith(
						Number
					),
				// couponExpired: sql`(SELECT expires_at IS NOT NULL AND expires_at < NOW() FROM coupons WHERE code = carts.coupon_code)`,
				// discountedtotal: sql`SUM(COALESCE(${cartItems.itemDiscountPrice}, ${cartItems.itemPrice}))`,
				// fullTotal: sql`SUM(${cartItems.itemPrice})`,
				total: sql`
          SUM(COALESCE(${cartItems.itemDiscountPrice}, ${cartItems.itemPrice})) - COALESCE(
              (
                  CASE 
                      WHEN NOT (SELECT expires_at IS NOT NULL AND expires_at < NOW() FROM coupons WHERE code = carts.coupon_code) THEN
                          CASE 
                              WHEN (SELECT type FROM coupons WHERE code = carts.coupon_code) = 'PERCENTAGE' THEN 
                                  ROUND(SUM(COALESCE(${cartItems.itemDiscountPrice}, ${cartItems.itemPrice})) * (SELECT value::numeric FROM coupons WHERE code = carts.coupon_code) / 100)
                              WHEN (SELECT type FROM coupons WHERE code = carts.coupon_code) = 'FIXED_AMOUNT' THEN 
                                  (SELECT value::numeric FROM coupons WHERE code = carts.coupon_code)
                          END
                  END
              ), 
              0
          )`.mapWith(Number),
				createdAt: carts.createdAt,
				updatedAt: carts.updatedAt,
				itemProducts: sql`array_agg(json_build_object(
                  'productId', products.id,
                  'productName', products.name,
                  'productSlug', products.slug,
                  'lineId', cart_items.line_id,
                  'itemPrice', cart_items.item_price,
                  'itemDiscountPrice', cart_items.item_discount_price
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
	// const result = (
	// 	await db
	// 		.select({
	// 			cartId: carts.id,
	// 			userId: carts.userId,
	// 			orderNumber: carts.orderNumber,
	// 			discount: carts.discount,
	// 			couponCode: carts.couponCode,
	// 			subtotal: carts.subtotal,
	// 			total: carts.total,
	// 			createdAt: carts.createdAt,
	// 			updatedAt: carts.updatedAt,
	// 			itemProductIds: sql`array_agg(${cartItems.productId})`,
	// 			itemLineIds: sql`array_agg(${cartItems.lineId})`,
	// 			itemPrices: sql`array_agg(${cartItems.itemPrice})`,
	// 			itemDiscountPrices: sql`array_agg(${cartItems.itemDiscountPrice})`
	// 		})
	// 		.from(carts)
	// 		.where(clause)
	// 		.leftJoin(cartItems, eq(cartItems.cartId, carts.id))
	// 		.groupBy(carts.id)
	// )[0];

	console.log(result);
};
