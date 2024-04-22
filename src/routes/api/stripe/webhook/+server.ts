import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { error, fail } from '@sveltejs/kit';
import { orders } from '$lib/server/db/schema';
import { db } from '$lib/server/db/conn';
import { eq } from 'drizzle-orm';
import type { WebhookEvent } from '$lib/types/stripe';
import type { RequestHandler } from './$types';
import { sendTemplateEmail } from '$lib/server/mail';
import { sendNotification } from '$lib/server/discord';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: RequestHandler = async ({ request }) => {
	const signature = request.headers.get('stripe-signature') || '';
	const payload = await request.text();

	try {
		const event = stripe.webhooks.constructEvent(
			payload,
			signature,
			STRIPE_WEBHOOK_SECRET
		) as WebhookEvent;

		const payment = event.data.object;
		const paymentId = payment.id;
		let orderStatus: any;
		let paymentConfirmedAt: any;

		// Stripe webhooks arrives before order creation..
		const order = (await db.select().from(orders).where(eq(orders.paymentId, paymentId)))[0];
		if (!order) {
			error(400, 'Order not found');
		}

		// Handle the event
		switch (event!.type) {
			case 'payment_intent.payment_failed':
				// Update the order, boleto might have failed.
				orderStatus = 'CANCELLED';
				paymentConfirmedAt = null;

				// Send user email
				await sendTemplateEmail(order.userEmail, 'order_canceled', 'mjml', {
					orderNumber: order.orderNumber
				});
				break;
			case 'payment_intent.requires_action':
				// Do nothing, we've already handled it
				return new Response();
			case 'payment_intent.succeeded':
				// Update order status for boleto (card is already confirmed.)
				orderStatus = 'COMPLETED';
				paymentConfirmedAt = new Date();

				// Send user email
				await sendTemplateEmail(order.userEmail, 'payment_approved', 'mjml', {
					orderNumber: order.orderNumber
				});
				break;
			default:
				console.error(`Unhandled event type ${event!.type}`);
		}

		// Update the order
		await db
			.update(orders)
			.set({ orderStatus, paymentConfirmedAt })
			.where(eq(orders.paymentId, paymentId));
	} catch (err: any) {
		await sendNotification(`Webhook Error: ${err}`);
		fail(400, { error: `Webhook Error: ${err}` });
	}

	// Return a 200 response to acknowledge receipt of the event
	return new Response();
};
