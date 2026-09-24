import { localeHeaderName } from '@xenous/i18n';
import { paraglideMiddleware } from '@xenous/i18n/server';
import { defineMiddleware } from 'nitro/h3';

export default defineMiddleware((event, next) => {
    // Responses differ by locale, so a cache must key on the header that picks it.
    event.res.headers.append('Vary', localeHeaderName);

    return paraglideMiddleware(event.req, () => next());
});
