import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

declare module 'bun' {
	interface Env {
		PG_CONN_DEV: string;
		PG_CONN_PROD: string;
	}
}

// Since this is a local script we use Bun to facilitate.
const dev = true;
let env = Bun.env.PG_CONN_DEV;
if (!dev) {
	env = Bun.env.PG_CONN_PROD;
}
console.log('Environment: ' + dev ? 'DEV' : 'PROD');

const sql = neon(env);
export const db = drizzle(sql);
