import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: RequestHandler = async ({ request }) => {
	const { amount } = await request.json();

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: 'brl',
		payment_method_types: ['card', 'boleto']
		// automatic_payment_methods: {
		// 	enabled: true
		// }
	});

	return json({
		clientSecret: paymentIntent.client_secret
	});
};
