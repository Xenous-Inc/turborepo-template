/**
 * Omits the key without removing a potential union
 */
// biome-ignore lint/suspicious/noExplicitAny: internal type
type DistributiveOmit<TObj, TKey extends keyof any> = TObj extends any ? Omit<TObj, TKey> : never;

export type { DistributiveOmit };
