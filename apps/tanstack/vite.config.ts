import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { varlockVitePlugin } from '@varlock/vite-integration';
import viteReact from '@vitejs/plugin-react';
import { FontaineTransform } from 'fontaine';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

/** Stand-in faces, best first. Only families `@capsizecss/metrics` knows work; the rest are dropped silently. */
const SANS_FALLBACKS = ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans'];
const MONO_FALLBACKS = ['Courier New', 'Roboto Mono', 'Noto Sans Mono'];

/** List every family — metrics read from a woff2 carry no category, so autodetection would treat mono as sans. */
const fontaine = FontaineTransform.vite({
    fallbacks: {
        'Geist Variable': SANS_FALLBACKS,
        'Geist Mono Variable': MONO_FALLBACKS,
        'Unbounded Variable': SANS_FALLBACKS,
    },
    /** Root paths like `/fonts/Inter.woff2` point into `public/`, which fontaine can't find alone. */
    resolvePath: id => {
        if (id.startsWith('/') && !id.startsWith('//')) {
            return new URL(`./public${id}`, import.meta.url);
        }

        return id;
    },
});

const config = defineConfig({
    plugins: [
        /** Loads and validates `.env.schema` up front, then inlines non-sensitive items at build time */
        varlockVitePlugin(),
        fontaine,
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
