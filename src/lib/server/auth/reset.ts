import { TimeSpan, createDate } from 'oslo';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { generateId } from 'lucia';
import { passwordResets, users } from '../db/schema';
import { db } from '../db/conn';
import { eq } from 'drizzle-orm';

// TODO: Make sure to implement rate limiting based on IP addresses.
export async function createPasswordResetToken(userId: string): Promise<string> {
	// Optionally invalidate all existing tokens
	await db.delete(passwordResets).where(eq(users.id, userId));

	const tokenId = generateId(40);
	const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));

	await db.insert(passwordResets).values({
		id: tokenId,
		userId,
		tokenHash,
		expiresAt: createDate(new TimeSpan(2, 'h'))
	});

	return tokenId;
}
