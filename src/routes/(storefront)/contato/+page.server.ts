import type { Actions } from './$types';
import { sendTemplateEmail } from '$lib/server/mail';
import { verifyTurnstile } from '$lib/server/captcha';

export const actions: Actions = {
	default: async ({ request }) => {
		const captcha = await verifyTurnstile(request);
		if (!captcha) return { success: false, failedCaptcha: true };

		const formData = await request.formData();
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
