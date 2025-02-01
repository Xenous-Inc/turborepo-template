import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        POSTGRES_URL: z.string().url(),
    },
    client: {},
    experimental__runtimeEnv: {
        POSTGRES_URL: process.env.POSTGRES_URL,
    },
    skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
