// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

import { env as apiEnv } from '@xenous/api/env';
import { env as authEnv } from '@xenous/auth/env';
import { env as dbEnv } from '@xenous/db/env';
import { env as httpEnv } from '@xenous/http/env';
import { env as loggerEnv } from '@xenous/logger/env';

export const env = createEnv({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    extends: [apiEnv, authEnv, dbEnv, httpEnv, loggerEnv] as any,
    server: {},
    client: {},
    shared: {
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    },
    experimental__runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
    },
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === 'lint',
});
