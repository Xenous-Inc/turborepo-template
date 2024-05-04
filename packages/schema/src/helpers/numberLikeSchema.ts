import { z } from 'zod';

export const numberLikeSchema = z
    .number()
    .nullish()
    .catch(ctx => (typeof ctx.input === 'number' && isNaN(ctx.input) ? undefined : ctx.input))
    .pipe(z.number().nullish());

export type NumberLikeSchema = z.infer<typeof numberLikeSchema>;
