import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { error, fail } from '@sveltejs/kit';
import { addresses, orders } from '$lib/server/db/schema';
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

		return new Response();
		const payment = event.data.object;
		const paymentId = payment.id;
		const billing: BillingDetails = event.data?.object?.charges?.data?.[0]?.billing_details;
		let orderStatus: any;

		console.log(billing);

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

		// If needed, update address for the order
		let addressId: number | null = null;
		if (!order.addressId && billing) {
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
		console.log(addressId);

		// Update the order status and address
		const set = addressId ? { orderStatus, addressId } : { orderStatus };
		await db.update(orders).set(set).where(eq(orders.paymentId, orders.paymentId));
	} catch (err: any) {
		fail(400, { error: `Webhook Error: ${err.message}` });
	}

	// Return a 200 response to acknowledge receipt of the event
	return new Response();
};
