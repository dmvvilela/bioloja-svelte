import { error, fail, redirect } from '@sveltejs/kit';
import { isEmail } from '$lib/utils/validation';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db/conn';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { createPasswordResetToken } from '$lib/server/auth/reset';
import type { Actions, PageServerLoad } from './$types';
import { sendTemplateEmail } from '$lib/server/mail/mail';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/');
	}

	const user = (await db.select().from(users).where(eq(users.id, locals.user.id)))[0];
	if (!user) {
		error(500, 'User not found');
	}

	return { user: { id: user.id, name: user.name, email: user.email } };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!isEmail(email)) {
			return fail(400, {
				email,
				message: 'E-mail inválido'
			});
		}

		// We won't tell the user if the e-mail exists.
		const user = (await db.select().from(users).where(eq(users.email, email.toLowerCase())))[0];
		if (!user) {
			return { success: true };
		}

		const verificationToken = await createPasswordResetToken(user.id);
		const verificationLink = PUBLIC_BASE_URL + '/esqueci-a-senha/' + verificationToken;

		await sendTemplateEmail(email, 'resetPassword', 'mjml', {
			name: user.name,
			verificationLink
		});
		return { success: true };
	}
};
