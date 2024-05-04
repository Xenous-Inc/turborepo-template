import { createEnv } from '@t3-oss/env-nextjs';

import { env as authEnv } from '@xenous/auth/env';
import { env as dbEnv } from '@xenous/db/env';
import { env as httpEnv } from '@xenous/http/env';
import { env as loggerEnv } from '@xenous/logger/env';

export const env = createEnv({
    extends: [authEnv, dbEnv, httpEnv, loggerEnv],
    server: {},
    client: {},
    shared: {},
    experimental__runtimeEnv: {},
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === 'lint',
});
