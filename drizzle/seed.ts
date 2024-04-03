import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.PG_CONN || '');
const db = drizzle(sql);

try {
	// await db.insert(schema.movies).values([
	// 	{
	// 		title: 'The Matrix',
	// 		releaseYear: 1999
	// 	},
	// 	{
	// 		title: 'The Matrix Reloaded',
	// 		releaseYear: 2003
	// 	},
	// 	{
	// 		title: 'The Matrix Revolutions',
	// 		releaseYear: 2003
	// 	}
	// ]);

	console.log(`Seeding complete.`);
} catch (error) {
	console.error('Error performing migration: ', error);
	process.exit(1);
}
