import { createJiti } from 'jiti';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

/**
 * Import env files to validate at build time. Use jiti so we can load .ts files in here.
 *
 * @type {import('./env.ts')}
 */
await createJiti(import.meta.url).import('./env');

const config = defineConfig({
    plugins: [nitro()],
    resolve: {
        tsconfigPaths: true,
    },
});

export default config;
