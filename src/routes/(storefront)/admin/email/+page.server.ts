import { renderEmailBody } from '$lib/server/mail/mail';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const svelteEmails = Object.keys(import.meta.glob('/src/lib/emails/svelte/**'))
		.map(
			(path) => path.slice(23, -7) // Trim `./` and `.svelte`
		)
		.filter((path) => path !== 'header');

	const mjmlEmails = Object.keys(import.meta.glob('/src/lib/emails/mjml/**'))
		.map(
			(path) => path.slice(21, -7) // Trim `./` and `.mjml`
		)
		.filter((path) => path !== 'header');

	return { svelteEmails, mjmlEmails };
};
