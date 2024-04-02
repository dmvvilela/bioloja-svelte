import { drizzle } from 'drizzle-orm/d1';
// import * as schema from './schema';

export const conn = (platform: App.Platform | undefined) => {
	if (!platform?.env.D1_DATABASE) {
		throw new Error('Database not configured');
	}

	return drizzle(platform.env.D1_DATABASE);
};
