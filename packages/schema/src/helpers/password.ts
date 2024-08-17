import { z } from 'zod';

export const passwordSchema = z
    .string()
    .min(6, { message: 'Пароль должен быть не меньше 6 символов' })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/g, {
        message: 'Пароль должен содержать буквы латинского алфавита и цифры',
    });

export type PasswordSchema = z.infer<typeof passwordSchema>;
