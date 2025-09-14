/**
 * Omits the key without removing a potential union
 */
type DistributiveOmit<TObj, TKey extends keyof any> = TObj extends any ? Omit<TObj, TKey> : never;

export type { DistributiveOmit };
