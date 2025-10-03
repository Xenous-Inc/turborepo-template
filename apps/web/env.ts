import { coolify } from '@t3-oss/env-core/presets-zod';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const env = createEnv({
    extends: [coolify()],
    shared: {
        /* Docker */
        DOCKER: z.stringbool().optional(),

        /* Node */
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    },
    server: {},
    client: {
        /* API */
        NEXT_PUBLIC_SERVER_URL: z.url(),

        /* Next Devtools */
        NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED: z.stringbool().optional(),

        /* TanStack Query Devtools */
        NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED: z.stringbool().optional(),
    },
    experimental__runtimeEnv: {
        /* Docker */
        DOCKER: process.env.DOCKER,

        /* Node */
        NODE_ENV: process.env.NODE_ENV,

        /* API */
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,

        /* Next Devtools */
        NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED: process.env.NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED,

        /* TanStack Query Devtools */
        NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED: process.env.NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED,
    },
    skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
    emptyStringAsUndefined: true,
});
