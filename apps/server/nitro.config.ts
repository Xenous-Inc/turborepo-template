import { defineNitroConfig } from 'nitro/config';
import { version } from './package.json';

// https://nitro.build/config
export default defineNitroConfig({
    serverDir: './src',

    runtimeConfig: { version },

    /** Maps bundled frames back to `src/...`; node needs `--enable-source-maps` to read them. */
    sourcemap: true,

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
        meta: { version },
        ui: {
            scalar: false,
            swagger: false,
        },
    },
});
