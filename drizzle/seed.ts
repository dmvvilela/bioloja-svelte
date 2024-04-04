import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../src/lib/server/db/schema';

const sql = neon(Bun.env.PG_CONN || '');
const db = drizzle(sql);

try {
	await db
		.insert(schema.tags)
		.values([
			{ name: 'Apresentações' },
			{ name: 'Apostilas' },
			{ name: 'Atividades Extras' },
			{ name: 'Acompanha Vídeos' },
			{ name: 'Ensino Médio' },
			{ name: 'Ensino Superior' },
			{ name: 'Promoções' }
		]);

	console.log(`Seeding complete.`);
} catch (error) {
	console.error('Error performing migration: ', error);
	process.exit(1);
}
