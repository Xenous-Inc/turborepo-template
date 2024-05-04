// @ts-nocheck

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

import { env as apiEnv } from '@xenous/api/env';
import { env as authEnv } from '@xenous/auth/env';
import { env as dbEnv } from '@xenous/db/env';
import { env as httpEnv } from '@xenous/http/env';
import { env as loggerEnv } from '@xenous/logger/env';

export const env = createEnv({
    extends: [apiEnv, authEnv, dbEnv, httpEnv, loggerEnv],
    shared: {
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    },
    server: {},
    client: {},
    experimental__runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
    },
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === 'lint',
});
