import logger from '$lib/server/logger';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db/conn';
import { carts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { sendNotification } from '$lib/server/discord';

export const load = (async ({ parent, fetch }) => {
	try {
		const { cart } = await parent();
		let paymentId = cart!.paymentId;
		let clientSecret;

		if (!paymentId) {
			const response = await fetch('/api/stripe/intent', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({ amount: cart!.total })
			});

			const result = await response.json();
			if (!response.ok) {
				console.error(result);
				throw new Error(result);
			}

			paymentId = result.paymentId;
			clientSecret = result.clientSecret;

			await db.update(carts).set({ paymentId }).where(eq(carts.id, cart!.cartId));
		} else {
			const response = await fetch('/api/stripe/intent', {
				method: 'PUT',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({ paymentId, amount: cart!.total })
			});

			const result = await response.json();
			clientSecret = result.clientSecret;
		}

		return { clientSecret, cart: { ...cart, paymentId } };
	} catch (err: any) {
		console.error(err);
		await logger.error(err.message);
		await sendNotification(err.message);
		redirect(302, '/carrinho');
	}
}) satisfies PageServerLoad;
