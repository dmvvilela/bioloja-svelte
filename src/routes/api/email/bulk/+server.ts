import { db } from '$lib/server/db/conn';
import { subscribers } from '$lib/server/db/schema';
import { sendTemplateEmail } from '$lib/server/mail';
import { isNull } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// TODO: Timing out on prod.. Also, get correct template..
export const POST: RequestHandler = async () => {
	const allSubscribers = await db
		.select({ email: subscribers.email })
		.from(subscribers)
		.where(isNull(subscribers.unsubscribedAt));

	// Function to delay execution
	const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

	// Send emails at a rate of 14 per second
	for (let i = 0; i < allSubscribers.length; i += 14) {
		const emails = allSubscribers.slice(i, i + 14).map((subscriber) => subscriber.email);
		await sendTemplateEmail(emails, 'weekly_promotions', 'mjml');
		console.log('Sending total: ', i + 1);
		await delay(1100); // delay 1.1 second every 14 emails
	}
	console.log('All sent!');

	return new Response();
};
