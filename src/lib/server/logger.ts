import pino from 'pino';
import { dev } from '$app/environment';
import { AXIOM_DATASET, AXIOM_ORG_ID, AXIOM_TOKEN } from '$env/static/private';
import { Axiom } from '@axiomhq/js';

// Example usage:
// logger.info(
// 	'successful login',
// 	{
// 		usr: {
// 			id: form.data.email
// 		},
// 		evt: {
// 			category: 'authentication',
// 			name: 'email',
// 			outcome: 'success'
// 		}
// 	},
// );

const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'];

let logger: any;

if (dev) {
	logger = pino({
		level: 'debug',
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true
			}
		}
	});
} else {
	const axiom = new Axiom({
		orgId: AXIOM_ORG_ID,
		token: AXIOM_TOKEN
	});

	logger = Object.fromEntries(
		logLevels.map((level) => [
			level,
			async (msg: any, data: object | undefined) => {
				axiom.ingest(AXIOM_DATASET, [{ proj: 'bioloja', level, msg, ...data }]);
				await axiom.flush();
			}
		])
	);
}

export default logger;
