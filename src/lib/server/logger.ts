import pino from 'pino';
import { dev } from '$app/environment';
import { AXIOM_DATASET, AXIOM_ORG_ID, AXIOM_TOKEN } from '$env/static/private';
import { Axiom } from '@axiomhq/js';

// TODO: Add more stuff:
// {
// 	"level": 30,
// 	"time": 1702064201458,
// 	"msg": "successful login",
// 	"pid": 817,
// 	"hostname": "MacBook-Air-von-Lars.local"
// }
// logger.info(
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
// 	'successful login'
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
			async (msg: any) => {
				axiom.ingest(AXIOM_DATASET, [{ level, msg }]);
				await axiom.flush();
			}
		])
	);
}

export default logger;
