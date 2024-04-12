import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Redirect old wordpress routes to the new one
export const GET: RequestHandler = async ({ params }) => {
	const categories = params.categories.split('/');
	const slug = categories.pop();

	redirect(301, `/loja/produto/${slug}`);
};
