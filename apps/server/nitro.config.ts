import { fileURLToPath } from 'node:url';
import { defineNitroConfig } from 'nitropack/config';

// https://nitro.build/config
export default defineNitroConfig({
    preset: 'node_server',
    compatibilityDate: 'latest',
    srcDir: 'src',
    alias: {
        '~/env': fileURLToPath(new URL('./env.ts', import.meta.url)),
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
    },
});
