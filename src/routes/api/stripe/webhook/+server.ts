import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { error, fail } from '@sveltejs/kit';
import { orders } from '$lib/server/db/schema';
import { db } from '$lib/server/db/conn';
import { eq } from 'drizzle-orm';
import type { WebhookEvent } from '$lib/types/stripe';
import type { RequestHandler } from './$types';

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

		const order = (await db.select().from(orders).where(eq(orders.paymentId, paymentId)))[0];
		if (!order) {
			error(400, 'Order not found');
		}

		// TODO: Save log of webhooks!
		// Handle the event
		switch (event!.type) {
			case 'payment_intent.payment_failed':
				// Update the order, houston we have a problem
				orderStatus = 'CANCELLED';
				break;
			case 'payment_intent.requires_action':
				// Do nothing, we already handled it
				return new Response();
			case 'payment_intent.succeeded':
				// If the order was boleto, this will update the order status
				// Also, independent of the order status, this will grab the user address
				orderStatus = 'COMPLETED';
				break;
			default:
				console.error(`Unhandled event type ${event!.type}`);
		}

		// Update the order
		await db.update(orders).set({ orderStatus }).where(eq(orders.paymentId, orders.paymentId));
	} catch (err: any) {
		fail(400, { error: `Webhook Error: ${err.message}` });
	}

	// Return a 200 response to acknowledge receipt of the event
	return new Response();
};
