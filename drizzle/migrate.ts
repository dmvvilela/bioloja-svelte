import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';

console.log('Migrating...');

const sql = neon(process.env.PG_CONN || '');
const db = drizzle(sql);

try {
	await migrate(db, { migrationsFolder: 'drizzle/migrations' });
	console.log('Tables migrated!');
} catch (error) {
	console.error('Error performing migration: ', error);
	process.exit(1);
}
