import { getProductUrlDownloadLink } from '$lib/server/storage';
import { error, fail, json } from '@sveltejs/kit';
import { orderProductsDownloads, orders } from '$lib/server/db/schema';
import { and, count, eq } from 'drizzle-orm';
import { db } from '$lib/server/db/conn';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) {
		return error(401);
	}

	const { linkName, linkUrl, orderNumber, productId } = await request.json();
	if (!linkName || !linkUrl || !orderNumber || !productId) {
		fail(400, {
			message: 'Dados inválidos.'
		});
	}

	try {
		// Check if the order exists and belongs to the user
		const order = (
			await db
				.select()
				.from(orders)
				.where(and(eq(orders.orderNumber, orderNumber), eq(orders.userId, locals.user.id)))
		)[0];
		if (!order) {
			fail(400, { message: 'Pedido não encontrado.' });
		}

		// Check if download time limit has passed
		if (!order.paymentConfirmedAt) {
			fail(400, { message: 'Pagamento não confirmado.' });
		}

		const now = new Date();
		const paymentConfirmedDate = new Date(order.paymentConfirmedAt!);
		const downloadExpirationDate = new Date(
			paymentConfirmedDate.getTime() + 7 * 24 * 60 * 60 * 1000
		);
		if (!order.paymentConfirmedAt || now > downloadExpirationDate) {
			fail(400, { message: 'Downloads expirados.' });
		}

		// Count the number of downloads for this link and check if the user has any left
		const downloadCount = (
			await db
				.select({ count: count() })
				.from(orderProductsDownloads)
				.where(
					and(
						eq(orderProductsDownloads.orderNumber, orderNumber),
						eq(orderProductsDownloads.productId, productId),
						eq(orderProductsDownloads.linkName, linkName)
					)
				)
		)[0];
		if (downloadCount.count >= 3) {
			return json({ link: null });
		}

		// Mark as downloaded on db.
		await db.insert(orderProductsDownloads).values({
			orderNumber,
			productId,
			linkName
		});

		// Last thing cause the download link will expire.
		const download = await getProductUrlDownloadLink(linkUrl);
		return json({ link: download });
	} catch (err: any) {
		error(500, {
			message: err.message
		});
	}
};
