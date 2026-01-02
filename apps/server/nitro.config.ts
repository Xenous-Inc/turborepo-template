import { defineNitroConfig } from 'nitro/config';
import { env } from './env';

// https://nitro.build/config
export default defineNitroConfig({
    preset: 'node_server',
    builder: 'rolldown',
    compatibilityDate: 'latest',
    serverDir: './src',
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
