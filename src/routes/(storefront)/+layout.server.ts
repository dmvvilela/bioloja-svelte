import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const cartId = cookies.get('cartId');

	return { user: locals.user, session: locals.session };
};
