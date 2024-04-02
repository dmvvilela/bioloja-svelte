/* eslint-disable @typescript-eslint/no-explicit-any */
import { conn } from '$lib/server/db/conn';
import { users } from '$lib/server/db/schema';
import { error, type RequestHandler } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';

export const GET = (async ({ request, platform }) => {
	try {
		// const result = await platform?.env.D1_DATABASE.prepare('SELECT * FROM users LIMIT 5').run();
		// const result = await platform?.env.D1_DATABASE.prepare(
		// 	"SELECT name FROM sqlite_master WHERE type='table'"
		// ).run();
		// const result = await platform?.env.D1_DATABASE.prepare('PRAGMA table_info(users)').run();

		const db = conn(platform);
		console.log(db);

		const createTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      hashed_password TEXT NOT NULL
    )
  `;
		const result = await platform?.env.D1_DATABASE.prepare(createTable).run();
		console.log(result);

		const insertUser = async () => {
			const res = await db
				.insert(users)
				.values({ id: '1', email: '<EMAIL>', hashedPassword: '<PASSWORD>' })
				.returning();
		};
		console.log(await insertUser());
		return new Response(JSON.stringify(result));
	} catch (err: any) {
		console.error(err);
		error(500, err.message);
	}
}) satisfies RequestHandler;

// export const GET = (async ({ request, platform }) => {
//   async fetch(request: Request, env: Env) {
//     const db = drizzle(env.<BINDING_NAME>);
//     const result = await db.select().from(users).all()
//     return Response.json(result);
//   },
// }) satisfies RequestHandler;
