import { subscribers } from '$lib/server/db/schema';
import { sendNotification } from '$lib/server/discord';
import { db } from '$lib/server/db/conn';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// TODO: Verify recaptcha
export const POST: RequestHandler = async ({ request }) => {
	const { email, from } = await request.json();

	try {
		await db.insert(subscribers).values({
			email,
			from
		});
	} catch (err) {
		console.log(err);
		return error(409, {
			message: 'Usuário já está cadastrado.'
		});
	}

	await sendNotification('Novo cadastro na lista de e-mails 😎');
	return new Response();
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	const result = await db
		.update(subscribers)
		.set({ unsubscribedAt: new Date() })
		.where(eq(subscribers.email, email));

	if (result.rowCount === 0) {
		return error(409, {
			message: 'Usuário não cadastrado.'
		});
	}

	await sendNotification('Cadastro removido da lista de e-mails 😕');
	return new Response();
};
