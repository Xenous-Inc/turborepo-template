/** biome-ignore-all lint/style/noProcessEnv: bypass this rule for env files, we can use process.env only here */

import { createEnv } from '@t3-oss/env-core';
import { coolify } from '@t3-oss/env-core/presets-zod';
import { dbEnv } from '@xenous/db/env';
import z from 'zod';
import { version } from './package.json';

export const env = createEnv({
    extends: [dbEnv, coolify()],
    server: {
        /* Docker */
        DOCKER: z.stringbool().optional(),

        /* Node */
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

        /* Auth */
        BETTER_AUTH_SECRET: z.string().min(32),
        BETTER_AUTH_URL: z.url(),

        /* Cors */
        CORS_ORIGIN: z
            .union([z.string(), z.array(z.url())])
            .transform(value => (Array.isArray(value) ? value : value.split(',')))
            .pipe(z.array(z.url())),

        /* Version */
        VERSION: z.literal(version).catch(version),
    },
    runtimeEnv: process.env,
    skipValidation: !!process.env.CI,
    emptyStringAsUndefined: true,
});
