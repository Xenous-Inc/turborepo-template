// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// note: for unknown reasons Next complains about access to server env variables, so we use client's ones

export const env = createEnv({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    extends: [] as any,
    server: {},
    client: {},
    shared: {
        NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    },
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
