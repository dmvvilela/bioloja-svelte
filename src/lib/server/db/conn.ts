import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { PG_CONN } from '$env/static/private';
// import * as schema from './schema';

const sql = neon(PG_CONN);
export const db = drizzle(sql);
