import { generateId } from 'lucia';
import { db } from './utils/database';
import { orders, users } from '../../src/lib/server/db/schema';
import exportedUsers from '../data/exported_users.json';
import exportedOrders from '../data/exported_orders.json';

for (const user of exportedUsers) {
	console.log(user.Username);

	const userId = generateId(15);
	// const userOldId = user.ID;

	const result = await db
		.insert(users)
		.values({
			id: userId,
			name: user['First Name'] + ' ' + user['Last Name'],
			email: user['User Email'],
			hashedPassword: user['User Pass'],
			createdAt: new Date(user['User Registered'])
		})
		.returning();
}
