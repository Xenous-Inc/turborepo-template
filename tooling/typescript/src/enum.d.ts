/**
 * Utility type to get item type of Record based enum
 *
 * @example
 * const Method = { GET: 'GET', POST: 'POST' } as const
 * type Method = EnumItem<typeof Method>; // 'GET' | 'POST'
 */
type EnumItem<T extends Record<any, any>> = {
    [Key in keyof T]: T[Key] extends string | number | symbol ? T[Key] : never;
}[keyof T];

export type { EnumItem };
