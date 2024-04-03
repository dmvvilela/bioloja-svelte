/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { users } from '$lib/server/db/schema';
import { error, type RequestHandler } from '@sveltejs/kit';

export const GET = (async () => {
	try {
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
