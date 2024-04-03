import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').notNull().primaryKey(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

// import {
//   Stages,
//   ticket_progress,
//   ticket_messages,
// } from "../../../drizzle/schema"
// import { desc } from "drizzle-orm"
// import { db } from "./conn"

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
