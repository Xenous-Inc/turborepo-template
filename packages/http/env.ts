import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

import { env as loggerEnv } from '@xenous/logger/env';

export const env = createEnv({
    extends: [loggerEnv],
    server: {},
    client: {
        NEXT_PUBLIC_HTTP_URL: z.preprocess(
            str =>
                str ||
                (process.env.VERCEL
                    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                    : `http://localhost:${process.env.PORT ?? 3000}`),
            z.string().url().optional()
        ),
        NEXT_PUBLIC_HTTP_LOGGING_ENABLED: z
            .enum(['true', 'false', ''])
            .optional()
            .transform(s => s === 'true')
            .pipe(z.boolean()),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_HTTP_URL: process.env.NEXT_PUBLIC_HTTP_URL,
        NEXT_PUBLIC_HTTP_LOGGING_ENABLED: process.env.NEXT_PUBLIC_HTTP_LOGGING_ENABLED,
    },
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
