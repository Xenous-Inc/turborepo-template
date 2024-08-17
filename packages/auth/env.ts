// @ts-nocheck

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

import { env as dbEnv } from '@xenous/db/env';

export const env = createEnv({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    extends: [dbEnv] as any,
    server: {
        NEXTAUTH_SECRET: process.env.NODE_ENV === 'production' ? z.string().min(1) : z.string().min(1).optional(),
        NEXTAUTH_TRUST_HOST: z
            .enum(['true', 'false', ''])
            .optional()
            .transform(s => {
                if (process.env.NODE_ENV === 'development') return true;

                switch (s) {
                    case 'true':
                        return true;
                    case 'false':
                        return false;
                    default:
                        return undefined;
                }
            })
            .pipe(z.boolean().optional()),
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    },
    client: {},
    shared: {},
    experimental__runtimeEnv: {},
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
