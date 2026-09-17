import { db } from '@xenous/db/client';
import * as schema from '@xenous/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import { ENV } from 'varlock/env';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
    }),
    secret: ENV.BETTER_AUTH_SECRET,
    baseURL: ENV.BETTER_AUTH_URL,
    trustedOrigins: ENV.CORS_ORIGIN,
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
