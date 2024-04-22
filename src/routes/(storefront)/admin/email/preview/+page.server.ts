import { renderEmailBody } from '$lib/server/mail';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const type = url.searchParams.get('type') as 'mjml' | 'svelte';
	const template = url.searchParams.get('template') as string;

	const email = await renderEmailBody(template, 'E-mail Preview', type, {
		email: 'danielbsb2@gmail.com',
		orderNumber: '12345',
		orderDate: new Date(),
		paymentMethodTitle: 'Boleto Bancário',
		couponCode: 'NOVABIOLOJA',
		discount: 1500,
		subtotal: 10000,
		total: 8500
	});

	return { html: email?.html, text: email?.text };
};
