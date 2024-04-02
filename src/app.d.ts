// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}

		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}

		// interface PageData {}

		interface Platform {
			env: {
				D1_DATABASE: D1Database;
				R2_BUCKET: R2Bucket;
			};
			context: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
