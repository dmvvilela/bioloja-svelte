import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/server/db/conn';
import { users } from '$lib/server/db/schema';
import { lucia } from '$lib/server/auth/lucia';
import { isEmail, isPassword } from '$lib/utils/validation';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(307, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirm = formData.get('confirm') as string;

		if (name.length < 3 || !isEmail(email) || !isPassword(password) || password !== confirm) {
			return fail(400, {
				email,
				message: 'Verifique seus dados e tente de novo.'
			});
		}

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);

		// Will throw if the user already exists
		try {
			await db.insert(users).values({
				id: userId,
				email,
				hashedPassword
			});
		} catch (err) {
			return fail(400, {
				email,
				message: 'Usuário já cadastrado.'
			});
		}

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
