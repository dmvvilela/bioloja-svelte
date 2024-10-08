import { db } from '$lib/server/db/conn';
import { addresses, carts, orderProducts, orders } from '$lib/server/db/schema';
import { sendNotification } from '$lib/server/discord';
import { error, json } from '@sveltejs/kit';
import { createOrderId } from '$lib/server/ids';
import type { Cart } from '$lib/types/checkout';
import type { BillingDetails, PaymentIntent, PaymentMethod } from '$lib/types/stripe';
import type { RequestHandler } from './$types';
import { getLocalePrice } from '$lib/utils/product';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { sendTemplateEmail } from '$lib/server/mail';
import logger from '$lib/server/logger';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: RequestHandler = async ({ locals, request }) => {
	const user = locals.user;
	if (!user) {
		await logger.error('/api/order error: no user found');
		error(401, { message: 'Usuário deslogado.' });
	}

	const { email, name, phone, cart, payment } = await request.json();
	if (!email || !name || !phone || !cart || !payment) {
		await logger.error(
			`/api/order error: invalid data ~> ${email}, ${name}, ${phone}, ${cart}, ${payment}`
		);
		error(400, { message: 'Dados inválidos.' });
	}

	try {
		const {
			id: paymentId,
			payment_method: paymentMethodId,
			next_action: nextAction,
			amount,
			status
		} = payment as PaymentIntent;

		const { cartId, couponDiscount, coupon, subtotal, total, products } = cart as Cart;

		// We need to fetch the payment method to get all the details
		const paymentMethod = (await stripe.paymentMethods.retrieve(paymentMethodId)) as PaymentMethod;

		const paymentMethodTitle = paymentMethod.type;
		const orderStatus =
			amount !== total
				? 'AWAITING'
				: status === 'requires_action'
				? 'PAYMENT_PENDING'
				: 'COMPLETED';
		const billing: BillingDetails = paymentMethod.billing_details;

		let addressId: number | null = null;
		if (billing) {
			addressId = (
				await db
					.insert(addresses)
					.values({
						email: billing.email,
						name: billing.name,
						city: billing.address.city,
						country: billing.address.country,
						line1: billing.address.line1,
						line2: billing.address.line2,
						state: billing.address.state,
						postalCode: billing.address.postal_code
					})
					.returning({ id: addresses.id })
			)[0].id;
		}

		// TODO: Grab the cart and double-check values (and if belongs to the user since we removed that with guest cart)
		// Create new order (and confirms if it is card cause webhook already arrived before order creation..)
		const orderNumber = await createOrderId();
		const returned = await db
			.insert(orders)
			.values({
				orderNumber,
				paymentId,
				paymentMethodId,
				userId: user.id,
				userEmail: email,
				userName: name,
				userPhone: phone,
				orderStatus,
				paymentMethodTitle,
				paymentConfirmedAt: orderStatus === 'COMPLETED' ? new Date() : null,
				addressId,
				boletoDetails: nextAction?.boleto_display_details,
				couponCode: coupon?.code,
				cartDiscount: couponDiscount,
				orderSubtotal: subtotal,
				orderTotal: total
			})
			.returning({ createdAt: orders.createdAt });

		// Create order items
		for (const product of products) {
			await db.insert(orderProducts).values({
				orderNumber,
				productId: product.id,
				price: product.price,
				discountPrice: product.discountPrice,
				name: product.name,
				slug: product.slug,
				image: product.imageUrls.split(',')[0].trim(),
				categories: product.categories.join(', '),
				downloadLinks: product.downloadLinks as any
			});
		}

		// Update cart with new order number
		await db.update(carts).set({ orderNumber }).where(eq(carts.id, cartId));

		// Send user emails
		await sendTemplateEmail(email, 'order_confirmed', 'mjml', {
			orderNumber,
			orderDate: returned[0].createdAt,
			email,
			paymentMethodTitle,
			couponCode: coupon?.code,
			discount: couponDiscount,
			subtotal,
			total
		});

		if (orderStatus === 'COMPLETED') {
			await sendTemplateEmail(email, 'payment_approved', 'mjml', {
				orderNumber: orderNumber
			});
		}

		// Send us discord notification
		await sendNotification(
			`Novo pedido #${orderNumber} na Bioloja de ${name}. Total: R$ ${getLocalePrice(
				total
			)}. Desconto: R$ ${getLocalePrice(cart.couponDiscount)}.`
		);

		// Return order number for the application to redirect correctly.
		return json({ orderNumber });
	} catch (err: any) {
		const message = `Erro no pedido. PaymentId: ${payment.id}, PaymentMethodId: ${payment.payment_method}, CartId: ${cart.cartId}, Amount: ${payment.amount}. ${err.message}`;
		await logger.error(message);
		await sendNotification(message);
		error(500, 'Ocorreu um erro. Estamos verificando o problema.');
	}
};
