import { customAlphabet } from 'nanoid';
import { db } from './db/conn';
import { orders } from './db/schema';
import { eq } from 'drizzle-orm';
import logger from './logger';

const MAX_RETRIES = 5;

const SHORT_ALPHABET = '0123456789';
const LONG_ALPHABET = '123467890ABCDEFGHJKLMNPQRTUVWXYZ';

export const createId = () => customAlphabet(LONG_ALPHABET, 8)();

// If needed to check for consistency:
export const createOrderId = async () => {
	for (let i = 0; i < MAX_RETRIES; i++) {
		// const longId = customAlphabet(SHORT_ALPHABET, 24)();
		const shortId = customAlphabet(SHORT_ALPHABET, 5)();

		try {
			const id = await db
				.select({ id: orders.orderNumber })
				.from(orders)
				.where(eq(orders.orderNumber, shortId));

			if (id.length) continue;
		} catch (err) {
			await logger.error(err);
			throw new Error('An error ocurred checking IDs from DB');
		}

		return shortId;
	}

	throw new Error('Could not generate unique ID');
};

export const createGiftcardCode = () => customAlphabet(LONG_ALPHABET, 8)();
