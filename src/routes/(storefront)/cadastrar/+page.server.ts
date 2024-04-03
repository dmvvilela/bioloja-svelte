import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { conn } from '$lib/server/db/conn';
import { users } from '$lib/server/db/schema';
import { lucia } from '$lib/server/auth/lucia';
import { isEmail, isPassword } from '$lib/utils/validation';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!isEmail(email) || !isPassword(password)) {
			return fail(400, {
				message: 'Credenciais inválidas'
			});
		}

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);
		const db = conn(event.platform);

		// Will throw if the user already exists
		// TODO: handle it
		await db.insert(users).values({
			id: userId,
			email,
			hashedPassword
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
