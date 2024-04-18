import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db/conn';
import { orders } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/');
	}

	// TODO: Paginate.. add items count
	const userOrders = await db
		.select({
			orderNumber: orders.orderNumber,
			orderStatus: orders.orderStatus,
			total: orders.orderTotal,
			createdAt: orders.createdAt
		})
		.from(orders)
		.where(eq(orders.userId, locals.user.id))
		.orderBy(desc(orders.createdAt));

	return { orders: userOrders };
}) satisfies PageServerLoad;
