import { renderEmailBody } from '$lib/server/mail/mail';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const type = url.searchParams.get('type') as 'mjml' | 'svelte';
	const template = url.searchParams.get('template') as string;

	const templateComponent = (await import(`/src/lib/emails/${type}/${template}.svelte`)).default;

	const email = await renderEmailBody(templateComponent, 'E-mail Preview', type, {
		// This is type-checked!
		prop: 'Test'
	});

	return { html: email?.html, text: email?.text };
};
