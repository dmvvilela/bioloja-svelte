/* eslint-disable @typescript-eslint/ban-ts-comment */
import { dev } from '$app/environment';
import { lucia } from '$lib/server/auth/lucia';
import type { Handle } from '@sveltejs/kit';

// When developing, this hook will add proxy objects to the `platform` object
// which will emulate any bindings defined in `wrangler.toml`.

let platform: App.Platform;

if (dev) {
	const { getPlatformProxy } = await import('wrangler');
	// @ts-ignore
	platform = await getPlatformProxy();
	console.log('Platform initialised for local development', platform);
}

export const handle = (async ({ event, resolve }) => {
	if (dev && platform) {
		event.platform = {
			...event.platform,
			...platform
		};
	}

	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
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

// export const handleError = Sentry.handleErrorWithSentry((({ error, event }) => {
// 	if (dev) {
// 		console.error(error);
// 		return;
// 	}

// 	return {
// 		message: 'Whoops! Check handleError() on hooks.server.ts',
// 		error,
// 		event
// 	};
// }) satisfies HandleServerError);
