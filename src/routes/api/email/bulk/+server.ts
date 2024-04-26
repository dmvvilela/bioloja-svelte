import { db } from '$lib/server/db/conn';
import { subscribers } from '$lib/server/db/schema';
import { sendTemplateEmail } from '$lib/server/mail';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
	const allSubscribers = await db.select({ email: subscribers.email }).from(subscribers);

	// Function to delay execution
	const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

	// Send emails at a rate of 14 per second
	for (let i = 0; i < allSubscribers.length; i += 14) {
		const emails = allSubscribers.slice(i, i + 14).map((subscriber) => subscriber.email);
		await sendTemplateEmail(emails, 'new_website', 'svelte');
		await delay(1100); // delay 1.1 second every 143 emails
	}

	return new Response();
};
