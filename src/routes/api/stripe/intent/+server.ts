import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const stripe = new Stripe(STRIPE_SECRET_KEY);

// Create payment intent
export const POST: RequestHandler = async ({ request }) => {
	const { amount } = await request.json();

	// TODO: throw and catch if amount is less than 50
	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: 'brl',
		payment_method_types: amount < 500 ? ['card'] : ['card', 'boleto']
	});

	return json({
		paymentId: paymentIntent.id,
		clientSecret: paymentIntent.client_secret
	});
};

// Update payment intent
export const PUT: RequestHandler = async ({ request }) => {
	const { paymentId, amount } = await request.json();

	const paymentIntent = await stripe.paymentIntents.update(paymentId, {
		amount,
		payment_method_types: amount < 500 ? ['card'] : ['card', 'boleto']
		// metadata: {
		// 	order_id: '6735'
		// }
	});

	return json({
		paymentId: paymentIntent.id,
		clientSecret: paymentIntent.client_secret
	});
};
