import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db/conn';
import { carts, coupons } from '$lib/server/db/schema';
import { sql, and, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// Apply coupon
export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) {
		error(401, { message: 'Usuário deslogado.' });
	}

	const { couponCode, cartId, subtotal } = await request.json();
	if (!couponCode?.length || !cartId || !subtotal) {
		error(400, {
			message: 'Dados inválidos.'
		});
	}

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
	// console.log(coupon);

	if (!coupon) {
		error(400, { message: 'Cupom não encontrado.' });
	}

	if (coupon.couponExpired) {
		error(410, { message: 'Cupom expirado.' });
	}

	if (coupon.couponUsed) {
		error(409, { message: 'Cupom já utilizado.' });
	}

	if (coupon.minAmount && subtotal < coupon.minAmount) {
		error(400, { message: 'Valor mínimo do cupom não atingido.' });
	}

	if (coupon.maxAmount && subtotal > coupon.maxAmount) {
		error(400, { message: 'Valor máximo para o cupom atingido.' });
	}

	// Coupon is valid, add to cart
	await db
		.update(carts)
		.set({ couponCode })
		.where(and(eq(carts.userId, user!.id), eq(carts.id, cartId)));

	return new Response();
};

// Remove coupon
export const DELETE: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) {
		error(401, { message: 'Usuário deslogado.' });
	}

	const { cartId } = await request.json();
	if (!cartId) {
		error(400, {
			message: 'Dados inválidos.'
		});
	}

	// Remove coupon from cart
	await db
		.update(carts)
		.set({ couponCode: null })
		.where(and(eq(carts.userId, user!.id), eq(carts.id, cartId)));

	return new Response();
};
