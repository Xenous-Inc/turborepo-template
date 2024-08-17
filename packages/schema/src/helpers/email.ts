import { z } from 'zod';

export const emailSchema = z
    .string()
    .transform(value => value.trim().toLocaleLowerCase())
    .pipe(z.string().min(1, { message: 'Это поле обязательно для заполнения' }).email('Неверный формат почты'));

export type EmailSchema = z.infer<typeof emailSchema>;
