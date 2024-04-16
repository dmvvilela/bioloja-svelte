import { db } from '$lib/server/db/conn';
import { orders } from '$lib/server/db/schema';
import { sendNotification } from '$lib/server/discord';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { userId, cartId } = await request.json();

	try {
		// await db.insert(orders).values();

		await sendNotification('Novo pedido na Bioloja.');
		return json({ success: true, orderNumber: 1234 });
	} catch (err) {
		await sendNotification('Erro no pedido #');
		error(500, 'Ocorreu um erro. Tente mais tarde.');
	}

	return new Response();
};
