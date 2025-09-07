import { fileURLToPath } from 'node:url';
import { defineNitroConfig } from 'nitropack/config';
import { env } from './env';

// https://nitro.build/config
export default defineNitroConfig({
    preset: 'node_server',
    compatibilityDate: 'latest',
    srcDir: 'src',
    alias: {
        '~/env': fileURLToPath(new URL('./env.ts', import.meta.url)),
    },
    routeRules: {
        '/**': {
            cors: true,
            headers: {
                'access-control-allow-origin': env.CORS_ORIGIN,
                'access-control-allow-methods': 'get, post, put, delete, patch, options',
                'access-control-allow-headers': 'content-type, authorization',
                'access-control-allow-credentials': 'true',
            },
        },
    },
    typescript: {
        strict: true,
        generateTsConfig: true,
    },
    experimental: {
        typescriptBundlerResolution: true,
    },
});
