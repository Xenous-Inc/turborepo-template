import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: ['src/**/*.ts'],
    outDir: '.output/types/src',

    unbundle: false,
    clean: true,

    dts: {
        emitDtsOnly: true,
    },
});
