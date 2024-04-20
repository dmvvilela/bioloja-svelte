import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db/conn';
import { carts, coupons } from '$lib/server/db/schema';
import { sql, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// Apply coupon
export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	const { couponCode, cartId, subtotal } = await request.json();

	if (!couponCode?.length || !cartId || !subtotal) {
		error(400, {
			message: 'Dados inválidos.'
		});
	}

	console.log(couponCode, cartId, subtotal);
	// TODO: Check if the user already used the coupon
	const coupon = (
		await db
			.select({
				code: coupons.code,
				value: coupons.value,
				type: coupons.type,
				minAmount: coupons.minAmount,
				maxAmount: coupons.maxAmount,
				couponExpired: sql`expires_at IS NOT NULL AND expires_at < NOW()`,
				couponUsed: sql`(SELECT COUNT(*) FROM orders WHERE coupon_code = coupons.code) >= max_uses`,
				userCouponUsed: user
					? sql`(SELECT COUNT(*) FROM orders WHERE coupon_code = coupons.code AND user_id = ${user.id}) > 0`
					: sql`false`
			})
			.from(coupons)
			.where(eq(coupons.code, couponCode))
	)[0];
	console.log(coupon);

	if (!coupon) {
		error(400, { message: 'Cupom não encontrado.' });
	}

	if (coupon.couponExpired) {
		error(410, { message: 'Cupom expirado.' });
	}

	if (coupon.couponUsed) {
		error(409, { message: 'Limite de uso do cupom alcançado.' });
	}

	if (coupon.userCouponUsed) {
		error(409, { message: 'Cupom já utilizado.' });
	}

	if (coupon.minAmount && subtotal < coupon.minAmount) {
		error(400, { message: 'Valor mínimo do cupom não atingido.' });
	}

	if (coupon.maxAmount && subtotal > coupon.maxAmount) {
		error(400, { message: 'Valor máximo para o cupom atingido.' });
	}

	// Coupon is valid, add to cart
	await db.update(carts).set({ couponCode }).where(eq(carts.id, cartId));

	return new Response();
};

// Remove coupon
export const DELETE: RequestHandler = async ({ request }) => {
	const { cartId } = await request.json();

	if (!cartId) {
		error(400, {
			message: 'Dados inválidos.'
		});
	}

	// Remove coupon from cart
	await db.update(carts).set({ couponCode: null }).where(eq(carts.id, cartId));

	return new Response();
};
