import { getProductUrlDownloadLink } from '$lib/server/storage';
import { fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const link = url.searchParams.get('link');
	console.log(link);
	if (!link) {
		fail(400, {
			message: 'Link is required.'
		});
	}

	// TODO: Verify everything and save on database.

	const download = await getProductUrlDownloadLink(link!);
	return json({ link: download });
};
