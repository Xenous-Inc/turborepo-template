import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { varlockVitePlugin } from '@varlock/vite-integration';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

const config = defineConfig({
    plugins: [
        /** Loads and validates `.env.schema` up front, then inlines non-sensitive items at build time */
        varlockVitePlugin(),
        nitro(),
        tailwindcss(),
        tanstackStart({ router: { routesDirectory: 'app', indexToken: 'page' } }),
        viteReact(),
    ],
    resolve: {
        tsconfigPaths: true,
    },
});

export default config;
