import { db } from '$lib/server/db/conn';
import { users } from '$lib/server/db/schema';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

// Update user name
export const PUT = (async ({ request }) => {
	const { id, name } = await request.json();

	try {
		await db.update(users).set({ name }).where(eq(users.id, id));

		return json({ success: true });
	} catch (err) {
		error(500, 'Ocorreu um erro. Tente mais tarde.');
	}
}) satisfies RequestHandler;
