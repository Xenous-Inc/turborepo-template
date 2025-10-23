import { ParseError, parsePhoneNumberWithError } from 'libphonenumber-js/mobile';
import z from 'zod';

export const phoneSchema = z
    .string()
    .transform(value => value.trim().toLocaleLowerCase())
    .pipe(z.string().min(1, { message: 'Required' }))
    .superRefine((value, ctx) => {
        try {
            parsePhoneNumberWithError(value, {
                defaultCountry: 'RU',
                extract: false,
            });
        } catch (error) {
            if (error instanceof ParseError) {
                let message: string | undefined;

                switch (error.message) {
                    case 'NOT_A_NUMBER':
                    case 'TOO_SHORT':
                    case 'TOO_LONG':
                        message = 'Invalid phone number format';
                        break;
                    case 'INVALID_COUNTRY':
                        message = 'Invalid country code format';
                        break;
                }

                ctx.addIssue({
                    code: 'custom',
                    message,
                });
            }
        }
    });

export type PhoneSchema = typeof phoneSchema;
