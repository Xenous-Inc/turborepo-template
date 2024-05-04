// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createEnv } from '@t3-oss/env-nextjs';

import { env as authEnv } from '@xenous/auth/env';
import { env as dbEnv } from '@xenous/db/env';
import { env as httpEnv } from '@xenous/http/env';

export const env = createEnv({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    extends: [authEnv, dbEnv, emailEnv, httpEnv] as any,
    server: {},
    client: {},
    shared: {},
    experimental__runtimeEnv: {},
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === 'lint',
});
