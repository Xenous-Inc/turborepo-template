/**
 * Utility type that takes an object type and makes the hover overlay more readable.
 *
 * {@link https://timdeschryver.dev/bits/pretty-typescript-types | Pretty TypeScript types}
 */
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type { Prettify };
