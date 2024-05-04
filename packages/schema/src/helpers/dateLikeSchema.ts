import { z } from 'zod';

export const dateLikeSchema = z.union([z.number(), z.string(), z.date(), z.null(), z.undefined()]).transform(data => {
    if (data === null || data === undefined) return null;
    return new Date(data);
});

export type DateLikeSchema = z.infer<typeof dateLikeSchema>;
