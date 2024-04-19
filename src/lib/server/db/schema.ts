import {
	pgTable,
	text,
	boolean,
	timestamp,
	integer,
	index,
	serial,
	primaryKey,
	jsonb,
	pgEnum,
	foreignKey,
	type AnyPgColumn
} from 'drizzle-orm/pg-core';

export type DownloadLinksType = { name: string; url: string }[];
export type BoletoDisplayDetailsType = {
	expires_at: number;
	hosted_voucher_url: string;
	number: string;
	pdf: string;
};

export const userRoles = pgEnum('user_roles', ['USER', 'EDITOR', 'ADMIN']);
export const couponTypes = pgEnum('coupon_types', ['PERCENTAGE', 'FIXED_AMOUNT']); // change to FLAT??
export const orderStatus = pgEnum('order_status', [
	'COMPLETED',
	'PAYMENT_PENDING',
	'PROCESSING',
	'CANCELLED',
	'AWAITING',
	'REFUNDED'
]);

export const users = pgTable(
	'users',
	{
		id: text('id').primaryKey(),
		name: text('name').notNull(),
		email: text('email').notNull().unique(),
		role: userRoles('role').notNull().default('USER'),
		hashedPassword: text('hashed_password').notNull(),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => ({
		idIdx: index('idx_users_id').on(table.id),
		emailIdx: index('idx_users_email').on(table.email)
	})
);

export const sessions = pgTable(
	'sessions',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		expiresAt: timestamp('expires_at', {
			withTimezone: true,
			mode: 'date'
		}).notNull()
	},
	(table) => ({
		userIdIdx: index('idx_sessions_user_id').on(table.userId)
	})
);

export const passwordResets = pgTable('password_resets', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	tokenHash: text('token_hash').notNull(),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const categories = pgTable(
	'categories',
	{
		id: serial('id').primaryKey(),
		parentId: integer('parent_id').references((): AnyPgColumn => categories.id),
		slug: text('slug').notNull().unique(),
		name: text('name').notNull()
	},
	(table) => ({
		slugIdx: index('idx_categories_slug').on(table.slug)
	})
);

export const tags = pgTable(
	'tags',
	{
		id: serial('id').primaryKey(),
		slug: text('slug').notNull().unique(),
		name: text('name').notNull()
	},
	(table) => ({
		slugIdx: index('idx_tags_slug').on(table.slug)
	})
);

export const products = pgTable(
	'products',
	{
		id: serial('id').primaryKey(),
		slug: text('slug').notNull().unique(),
		name: text('name').notNull(),
		published: boolean('published').notNull().default(true),
		featured: boolean('featured').notNull().default(false),
		shortDescription: text('short_description').notNull(),
		description: text('description').notNull(),
		price: integer('price').notNull(),
		discountPrice: integer('discount_price'),
		discountExpiresAt: timestamp('discount_expires_at'),
		imageUrls: text('image_urls').notNull(),
		downloadLinks: jsonb('download_links').notNull().$type<DownloadLinksType>(),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => ({
		idIdx: index('idx_products_id').on(table.id),
		slugIdx: index('idx_products_slug').on(table.slug)
	})
);

export const productTags = pgTable(
	'product_tags',
	{
		productId: integer('product_id').references(() => products.id),
		tagId: integer('tag_id').references(() => tags.id)
	},
	(table) => ({
		pk: primaryKey({ columns: [table.productId, table.tagId] }),
		pkWithCustomName: primaryKey({ name: 'productTags', columns: [table.productId, table.tagId] }),
		productIdIdx: index('idx_product_tags_product_id').on(table.productId),
		tagIdIdx: index('idx_product_tags_tag_id').on(table.tagId)
	})
);

export const productCategories = pgTable(
	'product_categories',
	{
		productId: integer('product_id').references(() => products.id),
		categoryId: integer('category_id').references(() => categories.id)
	},
	(table) => ({
		pk: primaryKey({ columns: [table.productId, table.categoryId] }),
		pkWithCustomName: primaryKey({
			name: 'productCategories',
			columns: [table.productId, table.categoryId]
		}),
		productIdIdx: index('idx_product_categories_product_id').on(table.productId),
		categoryIdIdx: index('idx_product_categories_category_id').on(table.categoryId)
	})
);

export const attributes = pgTable(
	'attributes',
	{
		id: serial('id').primaryKey(),
		slug: text('slug').notNull().unique(),
		name: text('name').notNull(),
		dataType: text('data_type').notNull()
	},
	(table) => ({
		slugIdx: index('idx_attributes_slug').on(table.slug)
	})
);

export const productAttributes = pgTable(
	'product_attributes',
	{
		productId: integer('product_id').references(() => products.id),
		attributeId: integer('attribute_id').references(() => attributes.id),
		valueText: text('value_text'),
		valueNumber: integer('value_number'),
		valueBoolean: boolean('value_boolean')
	},
	(table) => ({
		pk: primaryKey({ columns: [table.productId, table.attributeId] }),
		pkWithCustomName: primaryKey({
			name: 'productAttributes',
			columns: [table.productId, table.attributeId]
		}),
		productIdIdx: index('idx_product_attributes_product_id').on(table.productId),
		attributeIdIdx: index('idx_product_attributes_attribute_id').on(table.attributeId)
	})
);

export const orders = pgTable(
	'orders',
	{
		orderNumber: text('order_number').primaryKey(),
		paymentId: text('payment_id').notNull(),
		paymentMethodId: text('payment_method_id').notNull(),
		paymentConfirmedAt: timestamp('payment_confirmed_at'),
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		userName: text('user_name').notNull(),
		userPhone: text('user_phone').notNull(),
		addressId: integer('address_id').references(() => addresses.id),
		orderStatus: orderStatus('order_status').notNull(),
		paymentMethodTitle: text('payment_method_title'),
		boletoDetails: jsonb('boleto_details').$type<BoletoDisplayDetailsType>(),
		couponCode: text('coupon_code').references(() => coupons.code),
		cartDiscount: integer('cart_discount').default(0),
		orderSubtotal: integer('order_subtotal').notNull(),
		orderTotal: integer('order_total').notNull(),
		orderRefund: integer('order_refund').default(0),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => ({
		userIdIdx: index('idx_orders_user_id').on(table.userId),
		orderNumberIdx: index('idx_orders_order_number').on(table.orderNumber),
		orderStatusIdx: index('idx_orders_order_status').on(table.orderStatus)
	})
);

export const orderProducts = pgTable(
	'order_products',
	{
		orderNumber: text('order_number')
			.notNull()
			.references(() => orders.orderNumber),
		productId: integer('product_id')
			.notNull()
			.references(() => products.id),
		lineId: serial('line_id'),
		refunded: boolean('refunded').default(false),
		slug: text('slug').notNull(),
		name: text('name').notNull(),
		categories: text('categories').notNull(),
		price: integer('price').notNull(),
		discountPrice: integer('discount_price'),
		image: text('image').notNull(),
		downloadLinks: jsonb('download_links').notNull().$type<DownloadLinksType>()
	},
	(table) => ({
		pk: primaryKey({ columns: [table.orderNumber, table.productId] }),
		pkWithCustomName: primaryKey({
			name: 'orderProducts',
			columns: [table.orderNumber, table.productId]
		}),
		orderNumberIdx: index('idx_order_products_order_number').on(table.orderNumber),
		productIdIdx: index('idx_order_products_product_id').on(table.productId)
	})
);

export const orderProductsDownloads = pgTable(
	'order_products_downloads',
	{
		id: serial('id').primaryKey(),
		orderNumber: text('order_number').notNull(),
		productId: integer('product_id').notNull(),
		linkName: text('link_name').notNull(),
		downloadedAt: timestamp('downloaded_at').notNull().defaultNow()
	},
	(table) => ({
		orderProductsReference: foreignKey({
			columns: [table.orderNumber, table.productId],
			foreignColumns: [orderProducts.orderNumber, orderProducts.productId],
			name: 'order_products_reference'
		}),
		linkNameIdx: index('idx_order_products_downloads_link_name').on(table.linkName),
		productIdIdx: index('idx_order_products_downloads_product_id').on(
			table.orderNumber,
			table.productId
		)
	})
);

export const coupons = pgTable(
	'coupons',
	{
		code: text('code').primaryKey(),
		value: integer('value').notNull(),
		type: couponTypes('type').notNull().default('PERCENTAGE'),
		minAmount: integer('min_amount'),
		maxAmount: integer('max_amount'),
		maxUses: integer('max_uses'),
		expiresAt: timestamp('expires_at', {
			withTimezone: true,
			mode: 'date'
		}),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => ({
		codeIdx: index('idx_coupons_code').on(table.code)
	})
);

export const addresses = pgTable(
	'addresses',
	{
		id: serial('id').primaryKey(),
		email: text('email'),
		name: text('name'),
		city: text('city'),
		country: text('country'),
		line1: text('line1'),
		line2: text('line2'),
		state: text('state'),
		postalCode: text('postal_code'),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => ({
		idIdx: index('idx_addresses_id').on(table.id)
	})
);

export const carts = pgTable(
	'carts',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		orderNumber: text('order_number').references(() => orders.orderNumber),
		couponCode: text('coupon_code').references(() => coupons.code),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => ({
		idIdx: index('idx_carts_id').on(table.id),
		userIdIdx: index('idx_carts_user_id').on(table.userId),
		orderNumberIdx: index('idx_carts_order_number').on(table.orderNumber)
	})
);

export const cartItems = pgTable(
	'cart_items',
	{
		cartId: text('cart_id')
			.notNull()
			.references(() => carts.id),
		productId: integer('product_id')
			.notNull()
			.references(() => products.id),
		lineId: serial('line_id')
	},
	(table) => ({
		pk: primaryKey({ columns: [table.cartId, table.productId] }),
		pkWithCustomName: primaryKey({
			name: 'cartItems',
			columns: [table.cartId, table.productId]
		}),
		orderNumberIdx: index('idx_cart_items_cart_id').on(table.cartId),
		productIdIdx: index('idx_cart_items_product_id').on(table.productId)
	})
);

export type User = typeof users.$inferSelect;
export type Sessions = typeof sessions.$inferSelect;
export type PasswordReset = typeof passwordResets.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductTag = typeof productTags.$inferSelect;
export type ProductCategory = typeof productCategories.$inferSelect;
export type Attribute = typeof attributes.$inferSelect;
export type ProductAttribute = typeof productAttributes.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderProduct = typeof orderProducts.$inferSelect;
export type OrderProductsDownload = typeof orderProductsDownloads.$inferSelect;
export type Coupon = typeof coupons.$inferSelect;
export type Address = typeof addresses.$inferSelect;
export type Cart = typeof carts.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;

export type UserRoles = (typeof userRoles.enumValues)[number];
export type CouponTypes = (typeof couponTypes.enumValues)[number];
export type OrderStatus = (typeof orderStatus.enumValues)[number];
