/* eslint-disable @typescript-eslint/no-explicit-any */
import { conn } from '$lib/server/db/conn';
import { users } from '$lib/server/db/schema';
import { error, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ platform }) => {
	try {
		const db = conn(platform);
		const result = await db
			.insert(users)
			.values({ id: '1', email: '<EMAIL>', hashedPassword: '<PASSWORD>' })
			.returning();

		return new Response(JSON.stringify(result));
	} catch (err: any) {
		console.error(err);
		error(500, err.message);
	}
}) satisfies RequestHandler;
