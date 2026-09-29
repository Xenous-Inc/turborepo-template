import z from 'zod';

export const dateLikeSchema = z
    // Number before string on purpose: numeric strings are epoch ms. Left to JS,
    // `new Date('5')` is May 2001 and `new Date('99')` is 1999.
    .union([z.undefined(), z.null(), z.nan(), z.coerce.number(), z.string(), z.date()])
    .transform((value, ctx) => {
        if (value === null || value === undefined) return value;

        // Go/protobuf send the 0 zero-value for an unset timestamp, so 0 is "no date", not 1970.
        if (value === 0) return undefined;

        // NaN means an upstream Number() already failed.
        if (typeof value === 'number' && Number.isNaN(value)) return undefined;

        // `.parse` would throw straight out of `safeParse`; Zod does not catch inside a transform.
        const parsed = z.coerce.date().safeParse(value);

        if (!parsed.success) {
            ctx.addIssue({ code: 'invalid_type', expected: 'date', input: value });

            return z.NEVER;
        }

        return parsed.data;
    });

export type DateLikeSchema = typeof dateLikeSchema;
