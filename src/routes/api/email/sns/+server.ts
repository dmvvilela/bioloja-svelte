import logger from '$lib/server/logger';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const snsMessage = await request.json();
	console.log(snsMessage);
	await logger.info(snsMessage);
	// return {
	// 		status: 200,
	// 		body: { message: 'Received' }
	// };

	return new Response();
};
