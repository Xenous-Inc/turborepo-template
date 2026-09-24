import { localeHeaderName, localeHeaderStrategy } from './header';
import { defineCustomServerStrategy, isLocale } from './paraglide/runtime.js';

/**
 * Resolves `custom-header` for `/rpc/*` and `/api/*`. Must run before the first request.
 * Not in `header.ts` because the compile script imports that before the runtime exists.
 */
export const setupLocaleHeaderStrategy = () => {
    defineCustomServerStrategy(localeHeaderStrategy, {
        getLocale: request => {
            const header = request?.headers.get(localeHeaderName);

            return header && isLocale(header) ? header : undefined;
        },
    });
};
