import { localeHeaderName } from '@xenous/i18n';
import { definePlugin } from 'nitro';
import { ENV } from 'varlock/env';

/** Anything `apps/tanstack` or `apps/next` sends must be listed, or the browser blocks the preflight. */
const ALLOWED_HEADERS = ['Content-Type', 'Authorization', localeHeaderName].join(', ');

export default definePlugin(async nitro => {
    nitro.hooks.hook('response', (res, event) => {
        const origin = event.req.headers.get('origin');

        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', ALLOWED_HEADERS);
        res.headers.set('Access-Control-Allow-Credentials', 'true');

        if (origin && ENV.CORS_ORIGIN.includes(origin)) {
            res.headers.set('Access-Control-Allow-Origin', origin);
            res.headers.append('Vary', 'Origin');
        }
    });
});
