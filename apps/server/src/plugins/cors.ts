import { localeHeaderName } from '@xenous/i18n';
import { definePlugin } from 'nitro';
import { ENV } from 'varlock/env';

/** Anything `apps/tanstack` or `apps/next` sends must be listed, or the browser blocks the preflight. */
const ALLOWED_HEADERS = ['Content-Type', 'Authorization', localeHeaderName].join(', ');

/** Browsers send a bare scheme://host:port, so a configured trailing slash or path would never match. */
const ALLOWED_ORIGINS = ENV.CORS_ORIGIN.map(value => new URL(value).origin);

/**
 * Everything the regex engine treats as syntax. `$&` is the matched character, so the replacement
 * puts a backslash in front of each one.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_the_replacement
 */
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Exact origins are a single lookup, so without wildcards no regex runs at all. */
const EXACT_ORIGINS = new Set(ALLOWED_ORIGINS.filter(origin => !origin.includes('*')));

/** `[^.]+` is one label, and the anchors stop `https://app.example.com.evil.com` slipping through. */
const ORIGIN_PATTERNS = ALLOWED_ORIGINS.filter(origin => origin.includes('*')).map(
    origin => new RegExp(`^${origin.split('*').map(escapeRegExp).join('[^.]+')}$`),
);

const isAllowedOrigin = (origin: string) =>
    EXACT_ORIGINS.has(origin) || ORIGIN_PATTERNS.some(pattern => pattern.test(origin));

export default definePlugin(async nitro => {
    nitro.hooks.hook('response', (res, event) => {
        const origin = event.req.headers.get('origin');

        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', ALLOWED_HEADERS);
        res.headers.set('Access-Control-Allow-Credentials', 'true');

        if (origin && isAllowedOrigin(origin)) {
            res.headers.set('Access-Control-Allow-Origin', origin);
            res.headers.append('Vary', 'Origin');
        }
    });
});
