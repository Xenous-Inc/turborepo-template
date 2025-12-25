import { fileURLToPath } from 'node:url';
import { defineNitroConfig } from 'nitro/config';
import { env } from './env';

// https://nitro.build/config
export default defineNitroConfig({
    preset: 'node_server',
    builder: 'rolldown',
    compatibilityDate: 'latest',
    serverDir: './src',
    alias: {
        '~/env': fileURLToPath(new URL('./env.ts', import.meta.url)),
        '~/*': fileURLToPath(new URL('./src/*', import.meta.url)),
    },
    routeRules: {
        '/**': { cors: true },
    },
    typescript: {
        strict: true,
        generateTsConfig: true,
    },
    experimental: {
        typescriptBundlerResolution: true,
        openAPI: true,
    },
    openAPI: {
        route: '/api/docs/openapi.json',
        meta: { version: env.VERSION },
        ui: {
            scalar: false,
            swagger: false,
        },
    },
});
