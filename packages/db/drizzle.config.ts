import type { Config } from 'drizzle-kit';
/** drizzle-kit runs this file directly, so load and validate the env ourselves */
import 'varlock/auto-load';
import { databaseUrl } from './src/url';

const nonPoolingUrl = databaseUrl.replace(':6543', ':5432');

const config = {
    schema: './src/schema/_index.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: { url: nonPoolingUrl },
    casing: 'snake_case',
} satisfies Config;

export default config;
