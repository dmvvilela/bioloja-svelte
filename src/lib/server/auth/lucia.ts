// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Lucia } from 'lucia';
// import { dev } from '$app/environment';
// import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
// import { db } from '../db/conn';
// import { sessions, users } from '../db/schema';

// const adapter = new DrizzleSQLiteAdapter(db as any, sessions, users);

// export const lucia = new Lucia(adapter, {
// 	sessionCookie: {
// 		attributes: {
// 			secure: !dev // TODO: Recheck this
// 		}
// 	},
// 	getUserAttributes: (attributes) => {
// 		return {
// 			// attributes has the type of DatabaseUserAttributes
// 			email: attributes.email
// 		};
// 	}
// });

// declare module 'lucia' {
// 	interface Register {
// 		Lucia: typeof lucia;
// 		DatabaseUserAttributes: DatabaseUserAttributes;
// 	}
// }

// interface DatabaseUserAttributes {
// 	email: string;
// }
