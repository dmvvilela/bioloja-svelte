import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth/lucia';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete(lucia.sessionCookieName, { path: '/' });

	redirect(303, '/');
};
