/**
 * Locale for API requests. A header rather than a cookie because SSR calls have
 * no cookie jar, and CDNs skip caching requests that carry cookies.
 */
export const localeHeaderName = 'X-Locale';

/** Paraglide requires custom strategy names to be prefixed. */
export const localeHeaderStrategy = 'custom-header';
