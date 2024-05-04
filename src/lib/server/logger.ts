import pino from 'pino';
import { dev } from '$app/environment';
import { AXIOM_DATASET, AXIOM_TOKEN } from '$env/static/private';

// let logger: pino.Logger;

// if (dev) {
// 	logger = pino({
// 		level: 'debug',
// 		transport: {
// 			target: 'pino-pretty',
// 			options: {
// 				colorize: true
// 			}
// 		}
// 	});
// } else {
// logger = pino(
// 	{ level: 'info' },
// 	pino.transport({
// 		target: '@axiomhq/pino',
// 		options: {
// 			dataset: AXIOM_DATASET,
// 			token: AXIOM_TOKEN
// 		}
// 	})
// );
// }

const logger = (err: any) => console.error(err);
logger.error = logger;

export default logger;
