type _MinLengthArray<T, MinLength extends number, R extends never[] = []> = R['length'] extends MinLength
    ? T[]
    : [T, ..._MinLengthArray<T, MinLength, [never, ...R]>];

/**
 * Utility type to restrict min length of an Array<T>
 *
 * @param T - Type of an Array item
 * @param MinLength - number. It's value determines min length of result
 *
 * @example MinLength<string> // [string, ...string[]]
 *
 * @example MinLength<string, 2> // [string, string, ...string[]]
 */
type MinLengthArray<T, MinLength extends number = 1> = _MinLengthArray<T, MinLength>;

export type { MinLengthArray };
