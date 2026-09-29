import { createAuthClient } from 'better-auth/react';
import { publicServerUrl } from './publicServerUrl';
import { serverUrl } from './serverUrl';

export const authClient = createAuthClient({
    /** Same split as the oRPC link: the browser needs the public URL, SSR can take the internal one. */
    baseURL: typeof window === 'undefined' ? serverUrl : publicServerUrl,
    fetchOptions: {
        /**
         * Server-side fetch has no cookie jar, so the session cookie must be forwarded or every server call is
         * anonymous. Only the cookie: the rest describes the incoming request and can clash with this one.
         */
        onRequest: async context => {
            if (typeof window !== 'undefined') return context;

            const { headers } = await import('next/headers');
            const cookie = (await headers()).get('cookie');

            if (cookie) context.headers.set('cookie', cookie);

            return context;
        },
    },
});
