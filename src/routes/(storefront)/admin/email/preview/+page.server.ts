import { renderEmailBody } from '$lib/server/mail';
import { mockData } from '$lib/utils/mail';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const type = url.searchParams.get('type') as 'mjml' | 'svelte';
	const template = url.searchParams.get('template') as string;

	const email = await renderEmailBody(template, 'E-mail Preview', type, mockData);

	return { html: email?.html, text: email?.text };
};
