import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db/conn';
import { orderProducts, orderProductsDownloads, orders } from '$lib/server/db/schema';
import { and, count, eq, inArray, sql } from 'drizzle-orm';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';
import type { PaymentMethod } from '$lib/types/stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export type OrderProduct = {
	orderNumber: string;
	productId: number;
	lineId: number;
	refunded: boolean;
	amount: number;
	slug: string;
	name: string;
	categories: string;
	price: number;
	discountPrice: number | null;
	image: string;
	downloadLinks: object;
};

export type BoletoDetails = {
	pdf: string;
	number: string;
	expires_at: number;
	hosted_voucher_url: string;
};

export type Order = {
	orderNumber: string;
	paymentId: string;
	paymentMethodId: string;
	userId: string;
	userName: string;
	userPhone: string;
	addressId: number;
	orderStatus: string;
	paymentMethodTitle: string;
	boletoDetails: BoletoDetails;
	couponCode: string;
	cartDiscount: number;
	orderSubtotal: number;
	orderTotal: number;
	orderRefund: number;
	createdAt: Date;
	updatedAt: Date;
	orderProducts: OrderProduct[];
};

export type OrderDownloadsCount = {
	name: string;
	count: number;
}[];

export const load = (async ({ locals, params, depends }) => {
	depends('order:details');

	const orderNumber = params.order;

	if (!locals.user) {
		redirect(307, '/');
	}

	if (!orderNumber) {
		redirect(307, '/minha-conta');
	}

	const order = (
		await db
			.select({
				orderNumber: orders.orderNumber,
				paymentId: orders.paymentId,
				paymentMethodId: orders.paymentMethodId,
				userId: orders.userId,
				userName: orders.userName,
				userPhone: orders.userPhone,
				addressId: orders.addressId,
				orderStatus: orders.orderStatus,
				paymentMethodTitle: orders.paymentMethodTitle,
				boletoDetails: orders.boletoDetails,
				couponCode: orders.couponCode,
				cartDiscount: orders.cartDiscount,
				orderSubtotal: orders.orderSubtotal,
				orderTotal: orders.orderTotal,
				orderRefund: orders.orderRefund,
				createdAt: orders.createdAt,
				updatedAt: orders.updatedAt,
				orderProducts: sql`array_agg(
                json_build_object(
                    'orderNumber', order_products.order_number, 
                    'productId', order_products.product_id, 
                    'lineId', order_products.line_id, 
                    'refunded', order_products.refunded, 
                    'slug', order_products.slug,
                    'name', order_products.name,
                    'categories', order_products.categories,
                    'price', order_products.price,
                    'discountPrice', order_products.discount_price,
                    'image', order_products.image,
                    'downloadLinks', order_products.download_links
                )
            )`
			})
			.from(orders)
			.leftJoin(orderProducts, eq(orderProducts.orderNumber, orders.orderNumber))
			.where(and(eq(orders.userId, locals.user.id), eq(orders.orderNumber, orderNumber)))
			.groupBy(orders.orderNumber)
	)[0] as Order;
	// console.log(order);

	// Get downloads for all products
	const productIds = order.orderProducts.map((product) => product.productId);
	const downloads = await db
		.select({ name: orderProductsDownloads.linkName, count: count() })
		.from(orderProductsDownloads)
		.where(
			and(
				eq(orderProductsDownloads.orderNumber, orderNumber),
				inArray(orderProductsDownloads.productId, productIds)
			)
		)
		.groupBy(orderProductsDownloads.linkName);
	// console.log(downloads);

	// We need to fetch the payment method to get all the details
	const payment = (await stripe.paymentMethods.retrieve(order.paymentMethodId)) as PaymentMethod;

	return { order, downloads, payment };
}) satisfies PageServerLoad;
