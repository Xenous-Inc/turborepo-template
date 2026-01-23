/** biome-ignore-all lint/style/noProcessEnv: bypass this rule for env files, we can use process.env only here */

import { createEnv } from '@t3-oss/env-core';
import { coolify } from '@t3-oss/env-core/presets-zod';
import z from 'zod';

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
        VITE_SERVER_URL: z.url(),

        /* TanStack Devtools */
        VITE_QUERY_DEVTOOLS_ENABLED: z.stringbool().optional(),
        VITE_ROUTER_DEVTOOLS_ENABLED: z.stringbool().optional(),
    },
    clientPrefix: 'VITE_',
    runtimeEnv: import.meta.env,
    skipValidation: !!process.env.CI,
    emptyStringAsUndefined: true,
});
