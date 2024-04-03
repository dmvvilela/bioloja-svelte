/* eslint-disable @typescript-eslint/ban-ts-comment */
import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { dev } from '$app/environment';
import { lucia } from '$lib/server/auth/lucia';
import type { Handle, HandleServerError } from '@sveltejs/kit';

// When developing, this hook will add proxy objects to the `platform` object
// which will emulate any bindings defined in `wrangler.toml`.
let platform: App.Platform;

if (dev) {
	const { getPlatformProxy } = await import('wrangler');
	// @ts-ignore
	platform = await getPlatformProxy();
	console.log('Platform initialised for local development', platform);
} else {
	Sentry.init({
		dsn: 'https://64f911bfb693718cdb6e43168c554183@o4504529324670976.ingest.us.sentry.io/4507019633557504',
		tracesSampleRate: 1
	});
}

const customHandle = (async ({ event, resolve }) => {
	// https://stackoverflow.com/questions/74904528/how-to-run-sveltekit-cloudflare-page-locally | https://github.com/sdarnell/cf-svelte/
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

export const handle = dev ? customHandle : sequence(Sentry.sentryHandle(), customHandle);

const customHandleError = (async ({ error, event }) => {
	return {
		message: 'Whoops! Check handleError() on hooks.server.ts',
		error,
		event
	};
}) satisfies HandleServerError;

export const handleError = dev ? customHandleError : Sentry.handleErrorWithSentry();
