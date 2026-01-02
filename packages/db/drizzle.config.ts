import type { Config } from 'drizzle-kit';
import { dbEnv } from './env';

const nonPoolingUrl = dbEnv.DATABASE_URL.replace(':6543', ':5432');

const config = {
    schema: './src/schema/_index.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: { url: nonPoolingUrl },
    casing: 'snake_case',
} satisfies Config;

export default config;
