import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: ['src/**/*.ts'],
    outDir: '.output/types/src',

    unbundle: false,
    clean: true,

    hash: false,

    /** tsdown >=0.22 emits .d.mts for ESM packages; project references expect .d.ts */
    outExtensions: () => ({ dts: '.d.ts' }),

    dts: {
        emitDtsOnly: true,
    },
});
