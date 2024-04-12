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
	type AnyPgColumn
} from 'drizzle-orm/pg-core';

export type DownloadLinksType = { name: string; url: string }[];

export const userRoles = pgEnum('user_roles', ['USER', 'EDITOR', 'ADMIN']);
export const couponTypes = pgEnum('coupon_types', ['PERCENTAGE', 'FIXED_AMOUNT']);
export const orderStatus = pgEnum('order_status', [
	'COMPLETED',
	'PAYMENT_PENDING',
	'PROCESSING',
	'CANCELLED',
	'AWAITING',
	'REFUNDED',
	'CART'
]);

export const users = pgTable(
	'users',
	{
		id: text('id').notNull().primaryKey(),
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
		id: serial('id').notNull().primaryKey(),
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
		orderNumber: text('order_number').notNull().primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		addressId: integer('address_id').references(() => addresses.id),
		orderStatus: orderStatus('order_status').notNull().default('CART'),
		orderDate: timestamp('order_date').notNull(),
		paymentMethodTitle: text('payment_method_title').notNull(),
		cartDiscount: text('cart_discount').notNull(),
		orderSubtotal: integer('order_subtotal').notNull(),
		orderRefund: integer('order_refund').notNull(),
		orderTotal: text('order_total').notNull(),
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
		orderNumber: text('order_number').references(() => orders.orderNumber),
		productSlug: text('product_slug').notNull(),
		productName: text('product_name').notNull(),
		lineId: integer('line_id').notNull(),
		refunded: boolean('refunded').notNull().default(false),
		itemPrice: integer('item_price').notNull()
	},
	(table) => ({
		pk: primaryKey({ columns: [table.orderNumber, table.productSlug] }),
		pkWithCustomName: primaryKey({
			name: 'orderProducts',
			columns: [table.orderNumber, table.productSlug]
		}),
		orderNumberIdx: index('idx_order_products_order_number').on(table.orderNumber),
		productSlugIdx: index('idx_order_products_product_slug').on(table.productSlug)
	})
);

export const coupons = pgTable(
	'coupons',
	{
		code: text('code').notNull().primaryKey(),
		value: text('value').notNull(),
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

export const orderCoupons = pgTable(
	'order_coupons',
	{
		orderNumber: text('order_number').references(() => orders.orderNumber),
		couponCode: text('coupon_code').references(() => coupons.code)
	},
	(table) => ({
		pk: primaryKey({ columns: [table.orderNumber, table.couponCode] }),
		orderNumberIdx: index('idx_order_coupons_order_number').on(table.orderNumber),
		couponCodeIdx: index('idx_order_coupons_coupon_code').on(table.couponCode)
	})
);

export const addresses = pgTable(
	'addresses',
	{
		id: serial('id').primaryKey(),
		userId: text('user_id').references(() => users.id),
		firstName: text('first_name').notNull(),
		lastName: text('last_name').notNull(),
		city: text('city').notNull(),
		state: text('state').notNull(),
		postalCode: text('postal_code').notNull(),
		country: text('country').notNull(),
		phone: text('phone').notNull(),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => ({
		idIdx: index('idx_addresses_id').on(table.id)
	})
);

export type Orders = typeof orders.$inferSelect;
// export type Stages = (typeof ticket_stages.enumValues)[number]

// export const findLastTicketProgress = async (
//   ticket_id: string,
//   completed = false
// ) => {
//   return db.query.ticket_progress.findFirst({
//     with: {
//       ticket_id,
//       completed,
//     },
//     orderBy: [desc(ticket_progress.created_at)],
//   })
// }
