import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';
import { z } from 'zod';

import { env as authEnv } from '@xenous/auth/env';
// import { env as dbEnv } from '@xenous/db/env';

export const env = createEnv({
    extends: [authEnv, vercel()],
    server: {
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        AUTH_REDIRECT_PROXY_URL: z.string().url(),
    },
    client: {},
    experimental__runtimeEnv: {},
    skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
