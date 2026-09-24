import { m } from '@xenous/i18n/messages';
import { ParseError, parsePhoneNumberWithError } from 'libphonenumber-js/mobile';
import z from 'zod';

export const phoneSchema = z
    .string()
    .transform(value => value.trim().toLocaleLowerCase())
    .pipe(z.string().min(1, { error: () => m.validators_required() }))
    .superRefine((value, ctx) => {
        // `min(1)` above already reported the empty string, so stop here instead of
        // adding a second issue for the same input.
        if (value.length === 0) {
            return;
        }

        try {
            const phoneNumber = parsePhoneNumberWithError(value, {
                defaultCountry: 'RU',
                extract: false,
            });

            // Parsing only checks the shape. `12` parses into `+712` and has to be
            // rejected here, or every short string gets through.
            if (!phoneNumber.isValid()) {
                ctx.addIssue({
                    code: 'custom',
                    message: m.validators_invalid_phone_format(),
                });
            }
        } catch (error) {
            if (error instanceof ParseError) {
                let message: string | undefined;

                switch (error.message) {
                    case 'NOT_A_NUMBER':
                    case 'TOO_SHORT':
                    case 'TOO_LONG':
                        message = m.validators_invalid_phone_format();
                        break;
                    case 'INVALID_COUNTRY':
                        message = m.validators_invalid_country_code();
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
