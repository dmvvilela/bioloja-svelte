import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';

console.log('Migrating...');

// Since this is a local script we use Bun to facilitate.
const sql = neon(Bun.env.PG_CONN);
const db = drizzle(sql);

try {
	await migrate(db, { migrationsFolder: 'drizzle/migrations' });
	console.log('Tables migrated!');
} catch (error) {
	console.error('Error performing migration: ', error);
	process.exit(1);
}

declare module 'bun' {
	interface Env {
		PG_CONN: string;
	}
}
