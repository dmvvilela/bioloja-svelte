import { db } from '$lib/server/db/conn';
import { carts, cartItems, products, coupons } from '$lib/server/db/schema';
import { sql, and, eq, isNull, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { json } from '@sveltejs/kit';
import type { Cart } from './types';

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
				createdAt: carts.createdAt,
				updatedAt: carts.updatedAt,
				coupon: sql`CASE WHEN carts.coupon_code IS NOT NULL THEN json_build_object(
              'code', carts.coupon_code, 
              'value', coupons.value::numeric, 
              'type', coupons.type, 
              'minAmount', coupons.min_amount::numeric,
              'maxAmount', coupons.max_amount::numeric,
              'couponExpired', (SELECT expires_at IS NOT NULL AND expires_at < NOW() FROM coupons WHERE code = carts.coupon_code),
              'couponUsed', (SELECT COUNT(*) FROM orders WHERE coupon_code = carts.coupon_code) >= (SELECT max_uses FROM coupons WHERE code = carts.coupon_code)
          ) ELSE NULL END`,
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
			})
			.from(carts)
			.leftJoin(cartItems, eq(cartItems.cartId, carts.id))
			.leftJoin(products, eq(products.id, cartItems.productId))
			.leftJoin(coupons, eq(coupons.code, carts.couponCode))
			.where(clause)
			.groupBy(carts.id, coupons.value, coupons.type, coupons.minAmount, coupons.maxAmount)
	)[0] as Cart;

	console.log(result);

	let subtotal = 0;
	let couponDiscount = 0;
	let productsDiscount = 0;
	let total = 0;

	result.products.forEach((product) => {
		if (product.discountPrice) {
			subtotal += product.discountPrice;
			productsDiscount += product.price - product.discountPrice;
		} else {
			subtotal += product.price;
		}
	});

	// If there's a valid coupon, apply it to the total
	const { coupon } = result;
	if (coupon) {
		if (!coupon.couponExpired && !coupon.couponUsed) {
			if (!coupon.minAmount || subtotal >= coupon!.minAmount) {
				if (!coupon.maxAmount || subtotal <= coupon!.maxAmount) {
					if (coupon.type === 'PERCENTAGE') {
						couponDiscount = Math.round((subtotal * coupon.value) / 100);
					} else {
						couponDiscount = coupon.value;
					}
				}
			}
		}
	}

	total = subtotal - couponDiscount;
	// console.log(`Subtotal: ${subtotal}, Discount: ${couponDiscount}, Total: ${total}`);

	return {
		cart: {
			...result,
			subtotal,
			couponDiscount,
			productsDiscount,
			total
		}
	};
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
