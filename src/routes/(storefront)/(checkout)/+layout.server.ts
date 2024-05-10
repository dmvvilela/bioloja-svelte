import { db } from '$lib/server/db/conn';
import { carts, cartItems, products, coupons } from '$lib/server/db/schema';
import { sql, and, eq, isNull, desc } from 'drizzle-orm';
import type { LayoutServerLoad } from '../$types';
import type { Cart } from '$lib/types/checkout';

export const load = (async ({ locals, cookies, depends }) => {
	const user = locals.user;
	let cartId;

	// Get cart from database
	if (user) {
		const cart = (
			await db
				.select()
				.from(carts)
				.where(and(eq(carts.userId, user.id), isNull(carts.orderNumber)))
				.orderBy(desc(carts.createdAt))
		)[0];

		if (cart) {
			cartId = cart.id;
		}
	} else {
		cartId = cookies.get('cartId');
	}

	// TODO: Verify this
	if (!cartId) {
		return {
			user: locals.user,
			session: locals.session,
			cart: null
		};
	}

	depends('app:checkout');

	// console.time('dbquery');
	const result = (
		await db
			.select({
				cartId: carts.id,
				paymentId: carts.paymentId,
				orderNumber: carts.orderNumber,
				createdAt: carts.createdAt,
				updatedAt: carts.updatedAt,
				coupon: sql`CASE WHEN carts.coupon_code IS NOT NULL THEN (
					SELECT json_build_object(
							'code', carts.coupon_code, 
							'value', coupons.value::numeric, 
							'type', coupons.type, 
							'minAmount', coupons.min_amount::numeric,
							'maxAmount', coupons.max_amount::numeric,
							'couponExpired', expires_at IS NOT NULL AND expires_at < NOW(),
							'couponUsed', (SELECT COUNT(*) FROM orders WHERE coupon_code = carts.coupon_code) >= max_uses
					)
					FROM coupons WHERE code = carts.coupon_code
			) ELSE NULL END`,
				products: sql`array_agg(
						CASE 
							WHEN products.id IS NOT NULL THEN json_build_object(
								'id', products.id,
								'slug', products.slug,
								'name', products.name,
								'categories', (SELECT array_agg(categories.name) FROM product_categories JOIN categories ON categories.id = product_categories.category_id WHERE product_categories.product_id = products.id),
								'imageUrls', products.image_urls,
								'lineId', cart_items.line_id,
								'price', products.price,
								'downloadLinks', products.download_links,
								'discountPrice', 
									CASE 
										WHEN products.discount_expires_at IS NOT NULL AND products.discount_expires_at < NOW() THEN 
											null
										ELSE 
											products.discount_price
									END
							)
						END
					) FILTER (WHERE products.id IS NOT NULL)`
			})
			.from(carts)
			.leftJoin(cartItems, eq(cartItems.cartId, carts.id))
			.leftJoin(products, eq(products.id, cartItems.productId))
			.leftJoin(coupons, eq(coupons.code, carts.couponCode))
			.where(eq(carts.id, cartId)) // TODO: Check if the cart belongs to user after on checkout
			.groupBy(carts.id, coupons.value, coupons.type, coupons.minAmount, coupons.maxAmount)
	)[0] as Cart;
	// console.timeEnd('dbquery');
	// console.log(result);

	// let userCouponUsed = false;
	// if (user) {
	// 	const count = await db.execute(
	// 		sql`SELECT COUNT(*) FROM orders WHERE coupon_code = carts.coupon_code AND user_id = ${user.id}`
	// 	);
	// 	console.log('COUNT: ', count);
	// 	// userCouponUsed = count > 0;
	// } else {
	// 	userCouponUsed = false;
	// }

	let subtotal = 0;
	let couponDiscount = 0;
	let productsDiscount = 0;
	let total = 0;

	if (result.products) {
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
		if (
			coupon &&
			!coupon.couponExpired &&
			!coupon.couponUsed &&
			/* !userCouponUsed && */
			(!coupon.minAmount || subtotal >= coupon!.minAmount) &&
			(!coupon.maxAmount || subtotal <= coupon!.maxAmount)
		) {
			if (coupon.type === 'PERCENTAGE') {
				couponDiscount = Math.round((subtotal * coupon.value) / 100);
			} else {
				couponDiscount = coupon.value;
			}
		} else if (coupon) {
			// Coupon is not valid, remove it from cart
			result.coupon = null;
			await db.update(carts).set({ couponCode: null }).where(eq(carts.id, cartId));
		}

		total = subtotal - couponDiscount;
		if (total < 0) total = 0; // TODO: Enable free orders?
	}
	// console.log(`Subtotal: ${subtotal}, Discount: ${couponDiscount}, Total: ${total}`);

	return {
		user: locals.user,
		session: locals.session,
		cartItemsCount: result.products ? result.products.length : 0,
		cart: {
			...result,
			subtotal,
			couponDiscount,
			productsDiscount,
			total
		}
	};
}) satisfies LayoutServerLoad;
