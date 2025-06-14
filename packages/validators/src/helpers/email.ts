import { z } from 'zod';

export const emailSchema = z
    .string()
    .transform(value => value.trim().toLocaleLowerCase())
    .pipe(z.string().min(1, { message: 'Required' }).email('Required'));

export type EmailSchema = typeof emailSchema;
