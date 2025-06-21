import { createJiti } from 'jiti';
import { defineConfig } from 'tsup';

/**
 * Import env files to validate at build time. Use jiti so we can load .ts files in here.
 *
 * @type {import('./env.ts')}
 */
await createJiti(import.meta.url).import('./env');

export default defineConfig({
    entry: ['src/**/*'],
    outDir: 'dist/src/', // Save `src/` directory to satisfy TypeScript project references feature

    format: ['esm'],
    clean: true,
    bundle: true,

    noExternal: ['@xenous/db'],
    skipNodeModulesBundle: false,

    dts: {
        compilerOptions: {
            composite: false,
        },
    },
});
