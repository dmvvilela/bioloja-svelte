import { sendTemplateEmail } from '$lib/server/mail';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { template, type } = await request.json();

	if (!template || !type) {
		error(400, 'Missing template or type');
	}

	await sendTemplateEmail('contato@bioloja.bio.br', template, type as any);

	return new Response();
};
