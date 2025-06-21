/**
 * Utility type to restrict min length of an Array<T>
 *
 * @param T - Type of an Array item
 * @param MinLength - Array<never>. It's length determines min length of result
 *
 * @example MinLength<string> // [string, ...string[]]
 *
 * @example MinLength<string, [never, never]> // [string, string, ...string[]]
 */
type MinLengthArray<T, MinLength extends never[] = [never]> = MinLength extends [
    never,
    ...infer RestLength extends never[],
]
    ? [T, ...MinLengthArray<T, RestLength>]
    : T[];

export type { MinLengthArray };
