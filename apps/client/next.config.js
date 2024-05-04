// @ts-nocheck

import { fileURLToPath } from 'url';
import createJiti from 'jiti';

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))('./env');

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.timeweb.cloud',
            },
        ],
    },

    /** Enables hot reloading for local packages without a build step */
    transpilePackages: ['@xenous/api', '@xenous/auth', '@xenous/db', '@xenous/http', '@xenous/ui', '@xenous/schema'],

    /** We already do linting and typechecking as separate tasks in CI */
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },

    webpack: config => {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                            dimensions: false,
                            memo: true,
                        },
                    },
                ],
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

export default config;
