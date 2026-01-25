import path from 'node:path';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate as drizzleMigrate } from 'drizzle-orm/postgres-js/migrator';
import { findUpSync } from 'find-up';

export const migrate = async <TSchema extends Record<string, unknown>>(db: PostgresJsDatabase<TSchema>) => {
    // biome-ignore lint/style/noNonNullAssertion: if we can't find migrations folder, we need to throw
    const root = path.dirname(findUpSync('pnpm-lock.yaml', { cwd: process.cwd() })!);
    const migrationsFolder = path.join(root, 'packages', 'db', 'migrations');

    await drizzleMigrate(db, { migrationsFolder });
};
