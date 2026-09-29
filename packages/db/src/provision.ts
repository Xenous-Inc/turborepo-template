import postgres from 'postgres';
import { ENV } from 'varlock/env';
import { databaseUrl } from './url';

/** Another preview container booting at the same time won the race. */
const DUPLICATE_DATABASE = '42P04';

/**
 * The name is spliced into SQL rather than bound, since Postgres takes no parameters for identifiers.
 * Anything outside this set is refused instead of escaped, and 63 is where Postgres starts truncating,
 * which would silently collide two branches.
 */
const SAFE_NAME = /^[a-zA-Z0-9_-]{1,63}$/; // anchored, so the whole name must be 1-63 letters, digits, `_` or `-`

/**
 * Preview deployments migrate into their own database, so it has to exist before the migrator runs.
 * Postgres has no `CREATE DATABASE IF NOT EXISTS`, and it cannot run inside a transaction, so this
 * connects to the maintenance database and checks first.
 */
export const ensureDatabase = async () => {
    if (!ENV.COOLIFY_PREVIEW) return;

    const name = decodeURIComponent(new URL(databaseUrl).pathname.slice(1));

    if (!SAFE_NAME.test(name)) {
        throw new Error(`Refusing to create a database named ${JSON.stringify(name)}`);
    }

    const maintenance = new URL(databaseUrl);
    maintenance.pathname = '/postgres';

    const sql = postgres(maintenance.href, { max: 1 });

    try {
        const [existing] = await sql`select 1 from pg_database where datname = ${name}`;

        // Quoted so hyphens survive and Postgres does not lowercase it.
        if (!existing) await sql.unsafe(`create database "${name}"`);
    } catch (error) {
        if ((error as { code?: string }).code !== DUPLICATE_DATABASE) throw error;
    } finally {
        await sql.end();
    }
};
