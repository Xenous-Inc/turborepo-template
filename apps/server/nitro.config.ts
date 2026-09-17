import { defineNitroConfig } from 'nitro/config';
import { ENV } from 'varlock/env';

// https://nitro.build/config
export default defineNitroConfig({
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
        meta: { version: ENV.VERSION },
        ui: {
            scalar: false,
            swagger: false,
        },
    },
});
