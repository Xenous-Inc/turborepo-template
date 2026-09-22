import { varlockNextConfigPlugin } from '@varlock/nextjs-integration/plugin';
import { ENV } from 'varlock/env';

const withVarlock = varlockNextConfigPlugin();

/** @type {import('next').NextConfig} */
const config = {
    output: ENV.DOCKER ? 'standalone' : undefined,
    reactStrictMode: true,

    devIndicators: ENV.NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED && {},

    /** Enables hot reloading for local packages without a build step */
    transpilePackages: ['@xenous/logger', '@xenous/ui', '@xenous/validators'],

    /** We already do linting and typechecking as separate tasks in CI */
    typescript: { ignoreBuildErrors: true },
};

export default withVarlock(config);
