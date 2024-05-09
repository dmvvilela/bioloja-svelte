import { fail, redirect } from '@sveltejs/kit';
import { isEmail } from '$lib/utils/validation';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db/conn';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { createPasswordResetToken } from '$lib/server/auth/reset';
import type { Actions, PageServerLoad } from './$types';
import { sendTemplateEmail } from '$lib/server/mail';
import { verifyRecaptcha } from '$lib/server/recaptcha';

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(307, '/');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const token = formData.get('token') as string;
		const email = formData.get('email') as string;

		const verified = await verifyRecaptcha(token);
		if (!verified) {
			return { success: false, message: 'Falhou o desafio do reCaptcha' };
		}

		if (!isEmail(email)) {
			return fail(400, {
				email,
				message: 'E-mail inválido'
			});
		}

		// We won't tell the user if the e-mail exists.
		const user = (await db.select().from(users).where(eq(users.email, email.toLowerCase())))[0];
		if (!user) {
			await sleep(50);

			return { success: true };
		}

		const verificationToken = await createPasswordResetToken(user.id);
		const verificationLink = PUBLIC_BASE_URL + '/esqueci-a-senha/' + verificationToken;

		await sendTemplateEmail(email, 'reset_password', 'mjml', {
			name: user.name,
			verificationLink
		});
		return { success: true };
	}
};
