import { createEnv } from '@t3-oss/env-core';
import z from 'zod/v4';
import { dbEnv } from '@xenous/db/env';
import { coolify } from "@t3-oss/env-core/presets-zod";

export const env = createEnv({
    extends: [dbEnv, coolify()],
    server: {
        /* Docker */
        DOCKER: z.stringbool().optional(),

        /* Node */
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

        /* Auth */
        BETTER_AUTH_SECRET:
            process.env.NODE_ENV === 'production'
                ? z.string()
                : z.string().optional(),
        BETTER_AUTH_URL:
            process.env.NODE_ENV === 'production'
                ? z.url()
                : z.url().optional(),

        /* Cors */
        CORS_ORIGIN: z.string(),
    },
    runtimeEnv: process.env,
    skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
    emptyStringAsUndefined: true,
});
