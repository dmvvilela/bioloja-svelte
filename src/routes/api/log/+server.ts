import logger from '$lib/server/logger';
import { sendNotification } from '$lib/server/discord';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { message = '', type = 'info', sendToDiscord = false } = await request.json();

	switch (type) {
		case 'error':
			await logger.error(message);
			break;
		case 'warn':
			await logger.warn(message);
			break;
		case 'debug':
			await logger.debug(message);
			break;
		case 'trace':
			await logger.trace(message);
			break;
		case 'info':
		default:
			await logger.info(message);
	}

	if (sendToDiscord) {
		await sendNotification(message);
	}

	return new Response();
};
