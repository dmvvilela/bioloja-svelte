import {
	pgTable,
	text,
	boolean,
	timestamp,
	integer,
	index,
	serial,
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
		userIdIdx: index('sessions_user_id_idx').on(table.userId)
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

export const products = pgTable('products', {
	id: text('id').notNull().primaryKey(),
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
});

export const tags = pgTable(
	'tags',
	{
		id: serial('id').primaryKey(),
		name: text('name').notNull(),
		productId: integer('product_id').references(() => products.id)
	},
	(table) => ({
		productIdIdx: index('tags_product_id_idx').on(table.productId)
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
