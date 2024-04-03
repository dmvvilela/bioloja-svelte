import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { dev } from '$app/environment';
import { lucia } from '$lib/server/auth/lucia';
import type { Handle, HandleServerError } from '@sveltejs/kit';

if (!dev) {
	Sentry.init({
		dsn: 'https://64f911bfb693718cdb6e43168c554183@o4504529324670976.ingest.us.sentry.io/4507019633557504',
		tracesSampleRate: 1
	});
}

const customHandle = (async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
}) satisfies Handle;

export const handle = dev ? customHandle : sequence(Sentry.sentryHandle(), customHandle);

const customHandleError = (async ({ error, event }) => {
	return {
		message: 'Whoops! Check handleError() on hooks.server.ts',
		error,
		event
	};
}) satisfies HandleServerError;

export const handleError = dev ? customHandleError : Sentry.handleErrorWithSentry();
