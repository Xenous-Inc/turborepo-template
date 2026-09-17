import { varlockVitePlugin } from '@varlock/vite-integration';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

const config = defineConfig({
    plugins: [
        /** Loads and validates `.env.schema` up front, then inlines non-sensitive items at build time */
        varlockVitePlugin(),
        nitro(),
    ],
    resolve: {
        tsconfigPaths: true,
    },
});

export default config;
