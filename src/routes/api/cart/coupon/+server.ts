import { fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/conn';
import { carts, coupons, users } from '$lib/server/db/schema';
import { sql, and, eq } from 'drizzle-orm';

// Apply coupon
export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) {
		fail(401, { error: 'Usuário deslogado.' });
	}

	const { couponCode, cartId, subtotal } = await request.json();
	if (!couponCode || !cartId || !subtotal) {
		fail(400, {
			message: 'Dados inválidos.'
		});
	}

	// Verify if the coupon code is valid
	const coupon = (
		await db
			.select({
				code: coupons.code,
				value: coupons.value,
				type: coupons.type,
				minAmount: coupons.minAmount,
				maxAmount: coupons.maxAmount,
				couponExpired: sql`expires_at IS NOT NULL AND expires_at < NOW()`,
				couponUsed: sql`(SELECT COUNT(*) FROM orders WHERE coupon_code = coupons.code AND user_id = ${
					user!.id
				}) >= max_uses`
			})
			.from(coupons)
			.where(eq(coupons.code, couponCode))
	)[0];

	if (!coupon) {
		fail(404, { message: 'Cupom não encontrado.' });
	}

	if (coupon.couponExpired) {
		fail(410, { message: 'Cupom expirado.' });
	}

	if (coupon.couponUsed) {
		fail(409, { message: 'Cupom já utilizado.' });
	}

	if (coupon.minAmount && subtotal < coupon.minAmount) {
		fail(400, { message: 'Valor mínimo do cupom não atingido.' });
	}

	if (coupon.maxAmount && subtotal > coupon.maxAmount) {
		fail(400, { message: 'Valor máximo para o cupom atingido.' });
	}

	// Coupon is valid, add to cart
	await db
		.update(carts)
		.set({ couponCode })
		.where(and(eq(users.id, user!.id), eq(carts.id, cartId)));

	return new Response();
};

// Remove coupon
export const DELETE: RequestHandler = async ({ request, locals }) => {
	return new Response();
};
