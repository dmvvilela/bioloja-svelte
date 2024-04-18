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

const stripe = new Stripe(STRIPE_SECRET_KEY);

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
			addressId,
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

		await sendNotification(
			`Novo pedido #${orderNumber} na Bioloja de ${name}. Total: R$ ${getLocalePrice(
				total
			)}. Desconto: R$ ${getLocalePrice(cart.couponDiscount)}.`
		);

		// Return order number for the application to redirect correctly.
		return json({ orderNumber });
	} catch (err: any) {
		await sendNotification(
			`Erro no pedido. PaymentId: ${payment.id}, PaymentMethodId: ${payment.payment_method}, CartId: ${cart.cartId}, Amount: ${payment.amount}`
		);
		error(500, 'Ocorreu um erro. Estamos verificando o problema.');
	}
};
