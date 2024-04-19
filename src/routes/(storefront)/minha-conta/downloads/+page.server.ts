import { db } from '$lib/server/db/conn';
import { orderProducts, orderProductsDownloads, orders } from '$lib/server/db/schema';
import { eq, gte, and, sql, inArray, count, isNotNull } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export type DownloadLink = {
	orderNumber: string;
	productId: number;
	productName: string;
	linkName: string;
	linkUrl: string;
	remaining: number;
	expired: boolean;
	expirationDate: Date;
};

export const load = (async ({ locals, depends }) => {
	const user = locals.user;
	if (!user) {
		redirect(307, '/');
	}

	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

	depends('my-downloads');
	const completedOrders = await db
		.select({
			orderNumber: orders.orderNumber,
			paymentConfirmedAt: orders.paymentConfirmedAt,
			orderStatus: orders.orderStatus,
			orderProducts: sql`
						array_agg(
									json_build_object(
													'orderNumber', order_products.order_number, 
													'productId', order_products.product_id, 
													'name', order_products.name,
													'lineId', order_products.line_id, 
													'refunded', order_products.refunded, 
													'downloadLinks', order_products.download_links
									)
						)`
		})
		.from(orders)
		.leftJoin(orderProducts, eq(orderProducts.orderNumber, orders.orderNumber))
		.where(
			and(
				eq(orders.userId, user.id),
				isNotNull(orders.paymentConfirmedAt), // so we also get partially refunded orders
				gte(orders.paymentConfirmedAt, sevenDaysAgo)
			)
		)
		.groupBy(orders.orderNumber);
	// console.log(completedOrders);

	// Get download count for all products
	const productIds = completedOrders.flatMap((order: any) =>
		order.orderProducts.map((product: any) => product.productId)
	);
	const downloads = await db
		.select({
			productId: orderProductsDownloads.productId,
			name: orderProductsDownloads.linkName,
			count: count()
		})
		.from(orderProductsDownloads)
		.where(inArray(orderProductsDownloads.productId, productIds))
		.groupBy(orderProductsDownloads.linkName, orderProductsDownloads.productId);
	// console.log(downloads);

	const downloadLinks = completedOrders
		.flatMap((order: any) => {
			return order.orderProducts.flatMap((product: any) => {
				return product.downloadLinks.map((link: any) => {
					const downloadCount = downloads.find(
						(download) => download.productId === product.productId && download.name === link.name
					)!.count;

					const paymentConfirmedAt = new Date(order.paymentConfirmedAt);
					const expirationDate = new Date(paymentConfirmedAt);
					expirationDate.setDate(paymentConfirmedAt.getDate() + 7); // Add 7 days to the payment confirmation date

					const now = new Date();
					const expired = now > expirationDate || downloadCount >= 3 || product.refunded;

					return {
						orderNumber: order.orderNumber,
						productId: product.productId,
						productName: product.name,
						linkName: link.name,
						linkUrl: link.url,
						lineId: product.lineId,
						remaining: 3 - downloadCount,
						expirationDate,
						expired
					};
				});
			});
		})
		.sort((a: any, b: any) => a.lineId - b.lineId);
	// console.log(downloadLinks);

	return { downloadLinks };
}) satisfies PageServerLoad;
