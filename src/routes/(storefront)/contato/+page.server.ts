import type { Actions } from './$types';
import { sendTemplateEmail } from '$lib/server/mail';
import { verifyRecaptcha } from '$lib/server/recaptcha';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const token = formData.get('token') as string;

		const verified = await verifyRecaptcha(token);
		if (!verified) return { success: false, failedRecaptcha: true };

		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const phone = formData.get('phone') as string;
		const orderNumber = formData.get('order-number') as string;
		const message = formData.get('message') as string;

		if (!name || !email || !message || message.length > 1000) {
			return { success: false };
		}

		try {
			await sendTemplateEmail('contato@bioloja.bio.br', 'site_contact', 'svelte', {
				name,
				email,
				phone,
				orderNumber,
				message
			});
		} catch (error) {
			return { success: false };
		}

		return { success: true };
	}
};
