/** biome-ignore-all lint/style/noProcessEnv: bypass this rule for env files, we can use process.env only here */

import { createEnv } from '@t3-oss/env-core';
import z from 'zod';

export const dbEnv = createEnv({
    server: {
        /* Node */
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

        /* Database */
        DATABASE_URL: z.url(),
    },
    runtimeEnv: process.env,
    skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
    emptyStringAsUndefined: true,
});
