import {
	pgTable,
	text,
	boolean,
	timestamp,
	integer,
	index,
	serial,
	primaryKey,
	type AnyPgColumn
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').notNull().primaryKey(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

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

export const categories = pgTable('categories', {
	id: serial('id').primaryKey(),
	parentId: integer('parent_id').references((): AnyPgColumn => categories.id),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull()
});
// Alternatively, using a standalone foreignKey operator
// export const categories = pgTable("categories", {
// 	id: serial("id").primaryKey(),
// 	parentId: integer("parent_id"),
//  }, (table) => {
// 	return {
// 		 parentReference: foreignKey({
// 			 columns: [table.parentId],
// 			 foreignColumns: [table.id],
// 			 name: "custom_fk"
// 		 }),
// 	};
//  });

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
		id: text('id').notNull().primaryKey(),
		slug: text('slug').notNull().unique(),
		name: text('name').notNull(),
		published: boolean('published').notNull().default(false),
		featured: boolean('featured').notNull().default(false),
		shortDescription: text('short_description').notNull(),
		description: text('description').notNull(),
		price: integer('price').notNull(),
		discountPrice: integer('discount_price').notNull(),
		discountExpiresAt: timestamp('discount_expires_at'),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => ({
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

// export const insertTicket = async (ticket_id: string, message: string) => {
//   return await db
//     .insert(ticket_messages)
//     .values({ ticket_id, message })
//     .returning()
// }

// export const insertTicketProgress = async (
//   ticketId: string,
//   stage: Stages,
//   exit_id?: string,
//   note?: string,
//   completed = false
// ) => {
//   const progress = await db
//     .insert(ticket_progress)
//     .values({
//       ticket_id: ticketId,
//       stage: stage as any,
//       completed,
//       exit_id,
//       note,
//     })
//     .returning()

//   return progress
// }

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

// export type Messages = typeof ticket_messages.$inferSelect
// export type Stages = (typeof ticket_stages.enumValues)[number]
// export type Exits = typeof ticket_exits.$inferSelect
// export type Progress = typeof ticket_progress.$inferSelect
