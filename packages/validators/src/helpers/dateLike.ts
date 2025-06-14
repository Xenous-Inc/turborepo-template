import { z } from 'zod';

export const dateLikeSchema = z
    .union([z.undefined(), z.null(), z.coerce.number(), z.string(), z.date()])
    .transform(value => {
        if (value === null || value === undefined) return value;
        if (value === 0) return undefined;

        return z.coerce.date().parse(value);
    });

export type DateLikeSchema = typeof dateLikeSchema;
