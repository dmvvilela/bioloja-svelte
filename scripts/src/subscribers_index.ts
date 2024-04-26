import { db } from './utils/database';
import { subscribers } from '../../src/lib/server/db/schema';
import exported from '../data/members_export_mailchimp/subscribed_members.json';

for (const user of exported) {
	console.log(user['Email Address']);

	try {
		const result = await db
			.insert(subscribers)
			.values({
				email: user['Email Address'].trim().toLowerCase(),
				from: 'mailchimp_import',
				firstName: user['First Name']?.length ? user['First Name'] : null,
				lastName: user['Last Name']?.length ? user['Last Name'] : null,
				subscribedAt: new Date(user['CONFIRM_TIME'])
			})
			.returning();
	} catch (e) {
		console.log('user already on db..');
		// console.error(e);
	}
}
