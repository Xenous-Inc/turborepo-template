import { createJiti } from 'jiti';

/**
 * Import env files to validate at build time. Use jiti so we can load .ts files in here.
 *
 * @type {import('./env.ts')}
 */
const { env } = await createJiti(import.meta.url).import('./env');

/** @type {import('next').NextConfig} */
const config = {
    output: env.DOCKER ? 'standalone' : undefined,
    reactStrictMode: true,

    devIndicators: env.NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED && {},

    /** Enables hot reloading for local packages without a build step */
    transpilePackages: ['@xenous/logger', '@xenous/ui', '@xenous/validators'],

    /** We already do linting and typechecking as separate tasks in CI */
    typescript: { ignoreBuildErrors: true },
};

export default config;
