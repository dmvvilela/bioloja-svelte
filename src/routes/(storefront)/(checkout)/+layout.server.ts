import { db } from '$lib/server/db/conn';
import { carts, cartItems, products, coupons } from '$lib/server/db/schema';
import { sql, and, eq, isNull, desc } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import type { Cart } from './types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const user = locals.user;

	// If the user is not logged in, we use client side cart
	if (!user) {
		return { cart: null };
	}

	// Get cart from database
	const cart = (
		await db
			.select()
			.from(carts)
			.where(and(eq(carts.userId, user.id), isNull(carts.orderNumber)))
			.orderBy(desc(carts.createdAt))
	)[0];
	if (!cart) {
		return json({ cart: null });
	}

	const cartId = cart.id;
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
                'categories', (SELECT array_agg(categories.name) FROM product_categories JOIN categories ON categories.id = product_categories.category_id WHERE product_categories.product_id = products.id),
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
			.where(and(eq(carts.id, cartId), eq(carts.userId, user?.id)))
			.groupBy(carts.id, coupons.value, coupons.type, coupons.minAmount, coupons.maxAmount)
	)[0] as Cart;

	// console.log(result);

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
}) satisfies LayoutServerLoad;
