import { sendNotification } from '$lib/server/discord';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db/conn';
import { subscribers } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const actions = {
	unsubscribe: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;

		if (!email) {
			return fail(400, { email, missing: true });
		}

		try {
			const response = await db
				.update(subscribers)
				.set({ unsubscribedAt: new Date() })
				.where(eq(subscribers.email, email));
			if (!response.rowCount) {
				return fail(400, { email, missing: true });
			}

			await sendNotification('Usuário descadastrado da lista de e-mails 😤');
		} catch (error) {
			return fail(400, { email, message: 'Ocorreu um erro inesperado.' });
		}

		return { success: true };
	},
	resubscribe: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;

		if (!email) {
			return fail(400, { email, missing: true });
		}

		try {
			const response = await db
				.update(subscribers)
				.set({ unsubscribedAt: null })
				.where(eq(subscribers.email, email));
			if (!response.rowCount) {
				return fail(400, { email, missing: true });
			}

			await sendNotification('Usuário recadastrado na lista de e-mails 😤');
		} catch (error) {
			return fail(400, { email, message: 'Ocorreu um erro inesperado.' });
		}

		return { resubscribed: true };
	}
} satisfies Actions;
