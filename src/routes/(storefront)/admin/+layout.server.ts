import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db/conn';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/');
	}

	// Fetch user and check role.
	const user = (
		await db.select({ role: users.role }).from(users).where(eq(users.id, locals.user.id))
	)[0];
	if (user.role !== 'ADMIN') {
		redirect(403, '/');
	}

	return {};
}) satisfies LayoutServerLoad;
