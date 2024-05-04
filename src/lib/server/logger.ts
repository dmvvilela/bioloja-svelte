// import pino from 'pino';
// import { dev } from '$app/environment';

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
// 	logger = pino(
// 		{ level: 'info' },
// 		pino.transport({
// 			target: '@axiomhq/pino',
// 			options: {
// 				dataset: process.env.AXIOM_DATASET,
// 				token: process.env.AXIOM_TOKEN
// 			}
// 		})
// 	);
// }

// export default logger;

const logger = (err: any) => console.error(err);
logger.error = logger;

export default logger;
