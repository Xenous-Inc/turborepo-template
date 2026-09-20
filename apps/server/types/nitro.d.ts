import 'nitro/types';

declare module 'nitro/types' {
    /** Values set under `runtimeConfig` in `nitro.config.ts`, readable anywhere via `useRuntimeConfig()`. */
    interface NitroRuntimeConfig {
        /** This app's package.json version. */
        version: string;
    }
}
