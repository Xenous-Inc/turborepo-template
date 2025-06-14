import { z } from 'zod';

export const numberLikeSchema = z
    .union([z.string().length(0), z.nan(), z.number().nullish()])
    .transform(value => (typeof value === 'number' && Number.isNaN(value) ? undefined : value))
    .pipe(z.number().nullish());

export type NumberLikeSchema = typeof numberLikeSchema;
