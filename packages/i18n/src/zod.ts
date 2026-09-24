import z from 'zod';
import * as zodLocales from 'zod/locales';
import { getLocale, type Locale } from './paraglide/runtime.js';

/** Zod 4 ships its own locale strings, so `zod-i18n-map` isn't needed. */
type ZodErrorMap = NonNullable<NonNullable<Parameters<typeof z.config>[0]>['localeError']>;
type LocaleFactory = () => { localeError: ZodErrorMap };

const errorMaps = new Map<Locale, ZodErrorMap>();

const errorMapFor = (locale: Locale) => {
    let errorMap = errorMaps.get(locale);

    if (!errorMap) {
        // `esModuleInterop` adds a `default` key that doesn't match `LocaleFactory`,
        // so the cast has to go through `unknown`.
        const factory = (zodLocales as unknown as Record<string, LocaleFactory | undefined>)[locale];

        errorMap = (factory ?? zodLocales.en)().localeError;
        errorMaps.set(locale, errorMap);
    }

    return errorMap;
};

/**
 * Call once at startup, not per request. The locale is looked up while an error
 * is being formatted, so each request reads its own value out of async local
 * storage and concurrent requests can't overwrite each other.
 */
export const setupZodLocale = () => {
    z.config({ localeError: issue => errorMapFor(getLocale())(issue) });
};
