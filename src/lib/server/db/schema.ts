import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').notNull().primaryKey(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull()
});

export const sessions = sqliteTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull()
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
