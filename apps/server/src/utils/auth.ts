import { db } from '@xenous/db/client';
import * as schema from '@xenous/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import { env } from '~/env';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
    }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: env.CORS_ORIGIN,
    emailAndPassword: {
        enabled: true,
    },
    plugins: [openAPI({ disableDefaultReference: true })],
    advanced: {
        defaultCookieAttributes: {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        },
    },
});
