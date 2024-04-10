import { db } from '$lib/server/db/conn';
import { products } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({ setHeaders, params }) => {
	// setHeaders({ 'cache-control': 'max-age=3600' });
	const product = (await db.select().from(products).where(eq(products.slug, params.slug)))[0];

	return { product };
}) satisfies PageServerLoad;
