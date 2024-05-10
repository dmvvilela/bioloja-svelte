import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db/conn';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/');
	}

	const user = (await db.select().from(users).where(eq(users.id, locals.user.id)))[0];
	if (!user) {
		error(500, 'User not found');
	}

	return { user: { ...locals.user, id: user.id, name: user.name, email: user.email } };
};
