/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { carts, orderProducts, orders } from '$lib/server/db/schema';
import { sendNotification } from '$lib/server/discord';
import { error, json } from '@sveltejs/kit';
import { createOrderId } from '$lib/server/ids';
import type { Cart } from '$lib/types/checkout';
import type { PaymentIntent } from '$lib/types/stripe';
import type { RequestHandler } from './$types';
import { getLocalePrice } from '$lib/utils/product';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
	const { userId, name, phone, cart, payment } = await request.json();

	try {
		const {
			id: paymentId,
			payment_method: paymentMethodId,
			next_action: nextAction,
			amount,
			status
		} = payment as PaymentIntent;

		console.log(payment);

		const { cartId, couponDiscount, coupon, subtotal, total, products } = cart as Cart;

		const orderStatus =
			amount !== total
				? 'AWAITING'
				: status === 'requires_action'
				? 'PAYMENT_PENDING'
				: 'COMPLETED';
		const paymentMethodTitle = status === 'requires_action' ? 'boleto' : 'card';

		// TODO: Grab the cart and double-check values.
		// Create new order (address can only be grabbed on webhook)
		const orderNumber = await createOrderId();
		await db.insert(orders).values({
			orderNumber,
			paymentId,
			paymentMethodId,
			userId,
			userName: name,
			userPhone: phone,
			orderStatus,
			paymentMethodTitle,
			boletoDetails: nextAction?.boleto_display_details,
			couponCode: coupon?.code,
			cartDiscount: couponDiscount,
			orderSubtotal: subtotal,
			orderTotal: total
		});

		// Create order items
		for (const product of products) {
			await db.insert(orderProducts).values({
				orderNumber,
				productId: product.id,
				amount: product.discountPrice || product.price
			});
		}

		// Update cart with new order number
		await db.update(carts).set({ orderNumber }).where(eq(carts.id, cartId));

		await sendNotification(
			`Novo pedido (#${orderNumber}) na Bioloja de ${name}. Total: R$ ${getLocalePrice(total)}`
		);
		return json({ success: true, orderNumber });
	} catch (err: any) {
		await sendNotification(
			`Erro no pedido. PaymentId: ${payment.id}, PaymentMethodId: ${payment.payment_method}, CartId: ${cart.cartId}, Amount: ${payment.amount}`
		);
		error(500, 'Ocorreu um erro. Estamos verificando o problema.');
	}
};
