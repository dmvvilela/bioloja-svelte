import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db/conn';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals, parent }) => {
	if (!locals.user) {
		redirect(307, '/');
	}

	const parentData = await parent();
	const user = (
		await db.select({ name: users.name }).from(users).where(eq(users.id, locals.user.id))
	)[0];
	if (!user) {
		error(500, 'User not found');
	}

	// TODO: Maybe is best to move userRole outside user object...
	return { ...parentData, user: { ...parentData.user, name: user.name } };
};
