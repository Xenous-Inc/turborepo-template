import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
    server: {},
    client: {},
    shared: {},
    experimental__runtimeEnv: {},
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === 'lint',
});
