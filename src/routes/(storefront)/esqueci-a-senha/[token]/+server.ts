import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth/lucia';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ setHeaders, params }) => {
	setHeaders({
		'Referrer-Policy': 'no-referrer'
	});

	const verificationToken = params.token;

	cookies.delete(lucia.sessionCookieName, { path: '/' });

	redirect(303, '/');
};
