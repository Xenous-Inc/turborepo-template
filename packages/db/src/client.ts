import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { ENV } from 'varlock/env';
import * as schema from './schema/_index';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR update.
 */
const globalForDb = globalThis as unknown as {
    connection: postgres.Sql | undefined;
};

const connection = globalForDb.connection ?? postgres(ENV.DATABASE_URL);
if (ENV.NODE_ENV !== 'production') globalForDb.connection = connection;

export const db = drizzle(connection, { schema, casing: 'snake_case' });
