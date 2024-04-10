import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/server/db/conn';
import { passwordResets, users } from '$lib/server/db/schema';
import { lucia } from '$lib/server/auth/lucia';
import { isPassword } from '$lib/utils/validation';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { isWithinExpirationDate } from 'oslo';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(307, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, setHeaders, cookies, params }) => {
		const formData = await request.formData();
		const password = formData.get('password') as string;
		const confirm = formData.get('confirm') as string;
		const verificationToken = params.token;

		setHeaders({
			'Referrer-Policy': 'no-referrer'
		});

		if (!isPassword(password) || password !== confirm) {
			return fail(400, {
				message: 'Senhas não conferem.'
			});
		}

		const tokenHash = encodeHex(await sha256(new TextEncoder().encode(verificationToken)));
		const token = (
			await db.select().from(passwordResets).where(eq(passwordResets.tokenHash, tokenHash))
		)[0];

		if (token) {
			await db.delete(passwordResets).where(eq(passwordResets.tokenHash, tokenHash));
		}

		if (!token || !isWithinExpirationDate(token.expiresAt)) {
			return fail(400, {
				message: 'Token expirado.'
			});
		}

		await lucia.invalidateUserSessions(token.userId);
		const hashedPassword = await new Argon2id().hash(password);
		await db.update(users).set({ hashedPassword }).where(eq(users.id, token.userId));

		const session = await lucia.createSession(token.userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(303, '/esqueci-a-senha/sucesso');
	}
};
