import { createIsomorphicFn, createMiddleware, createServerFn } from '@tanstack/react-start';
import { getLocale, localeHeaderName } from '@xenous/i18n';
import { createAuthClient } from 'better-auth/react';
import { publicServerUrl, serverUrl } from './serverUrl';

/** Same split as the oRPC link: the browser needs the public URL, SSR can take the internal one. */
const getBaseURL = createIsomorphicFn()
    .server(() => serverUrl)
    .client(() => publicServerUrl);

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
    fetchOptions: {
        /** Per request, not at construction: the locale changes when the user switches language. */
        onRequest: context => {
            context.headers.set(localeHeaderName, getLocale());

            return context;
        },
    },
});

export const authMiddleware = createMiddleware().server(async ({ next, request }) => {
    // Forward the user's headers so the session cookie reaches the API.
    const session = await authClient.getSession({
        fetchOptions: {
            headers: request.headers,
            throw: true,
        },
    });

    return next({
        context: { session },
    });
});

export const getSession = createServerFn({ method: 'GET' })
    .middleware([authMiddleware])
    .handler(async ({ context }) => {
        return context.session;
    });
