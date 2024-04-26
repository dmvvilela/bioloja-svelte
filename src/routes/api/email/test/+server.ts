import { sendTemplateEmail } from '$lib/server/mail';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
	await sendTemplateEmail('contato@bioloja.bio.br', 'new_website', 'svelte');

	return new Response();
};
