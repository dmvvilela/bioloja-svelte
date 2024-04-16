/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: RequestHandler = async ({ request }) => {
	const signature = request.headers.get('stripe-signature') || '';
	const payload = await request.text();

	let event;
	try {
		event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
	} catch (err: any) {
		fail(400, { error: `Webhook Error: ${err.message}` });
	}

	console.log(event);
	console.log(JSON.stringify(event, null, 2));

	// TODO: Save log of webhooks!
	// Handle the event
	switch (event!.type) {
		case 'payment_intent.payment_failed':
			const paymentIntentPaymentFailed = event.data.object;
			// Then define and call a function to handle the event payment_intent.payment_failed
			break;
		case 'payment_intent.requires_action':
			const paymentIntentRequiresAction = event.data.object;
			// Then define and call a function to handle the event payment_intent.requires_action
			break;
		case 'payment_intent.succeeded':
			const paymentIntentSucceeded = event.data.object;
			// Then define and call a function to handle the event payment_intent.succeeded
			break;
		// ... handle other event types
		default:
			console.log(`Unhandled event type ${event!.type}`);
	}

	// Return a 200 response to acknowledge receipt of the event
	return new Response();
};
