import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { isEmail, isPassword } from '$lib/utils/validation';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { lucia } from '$lib/server/auth/lucia';
import { db } from '$lib/server/db/conn';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(307, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies, url, fetch }) => {
		const formData = await request.formData();
		const email = (formData.get('email') as string)?.trim();
		const password = formData.get('password') as string;

		if (!isEmail(email) || !isPassword(password)) {
			return fail(400, {
				email,
				message: 'Credenciais inválidas'
			});
		}

		const existingUser = (
			await db.select().from(users).where(eq(users.email, email.toLowerCase()))
		)[0];

		if (!existingUser) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid emails from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid emails.
			// However, valid emails can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If emails are public, you may outright tell the user that the email is invalid.
			// TODO: Add rate limiting from upstash
			return fail(400, {
				email,
				message: 'Credenciais inválidas'
			});
		}

		const validPassword = await new Argon2id().verify(existingUser.hashedPassword, password);
		if (!validPassword) {
			return fail(400, {
				email,
				message: 'Credenciais inválidas'
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		// Combine guest cart with user's cart.
		await fetch('/api/cart/combine', { method: 'POST' });

		if (url.searchParams.has('redirectTo')) {
			redirect(303, url.searchParams.get('redirectTo') as string);
		}

		redirect(303, '/');
	}
};
