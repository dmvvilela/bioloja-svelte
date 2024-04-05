import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

declare module 'bun' {
	interface Env {
		PG_CONN_DEV: string;
		PG_CONN_PROD: string;
	}
}

// Since this is a local script we use Bun to facilitate.
const sql = neon(Bun.env.PG_CONN_DEV);
export const db = drizzle(sql);
