// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    extends: [] as any,
    server: {
        POSTGRES_PRISMA_URL: z.string().url(),
        POSTGRES_URL_NON_POOLING: z.string().url(),
    },
    client: {},
    shared: {
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    },
    experimental__runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
    },
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
