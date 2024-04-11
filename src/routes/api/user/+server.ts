/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/server/db/conn';
import { users } from '$lib/server/db/schema';
import { sendMail } from '$lib/server/mail/mail';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET = (async () => {
	try {
		// const result = await db
		// 	.insert(users)
		// 	.values({ id: '1', email: '<EMAIL>', hashedPassword: '<PASSWORD>' })
		// 	.returning();

		const result = await sendMail(
			'dmvvilela@gmail.com',
			'Test Mail',
			'<h1>Test Mail</h1><p>I rock!</p>'
		);
		console.log(result);
		return new Response();
		// return new Response(JSON.stringify(result));
	} catch (err: any) {
		console.error(err);
		error(500, err.message);
	}
}) satisfies RequestHandler;

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
