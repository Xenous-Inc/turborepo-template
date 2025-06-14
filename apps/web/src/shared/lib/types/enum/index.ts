/**
 * Utility type to get item type of Record based enum
 *
 * @example
 * const Method = { GET: 'get', POST: 'post' } as const
 * type Method = EnumItem<typeof Method>; // 'get' | 'post'
 */
// biome-ignore lint/suspicious/noExplicitAny: internal type
type EnumItem<T extends Record<any, any>> = {
    [Key in keyof T]: T[Key] extends string | number | symbol ? T[Key] : never;
}[keyof T];

export type { EnumItem };
