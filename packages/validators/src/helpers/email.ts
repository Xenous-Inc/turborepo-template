import { m } from '@xenous/i18n/messages';
import z from 'zod';

export const emailSchema = z
    .string()
    .transform(value => value.trim().toLocaleLowerCase())
    .pipe(z.string().min(1, { error: () => m.validators_required() }))
    .pipe(z.email({ error: () => m.validators_invalid_email_format() }));

export type EmailSchema = typeof emailSchema;
