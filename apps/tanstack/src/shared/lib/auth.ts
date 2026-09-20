import { createIsomorphicFn, createMiddleware, createServerFn } from '@tanstack/react-start';
import { createAuthClient } from 'better-auth/react';
import { ENV } from 'varlock/env';

/** Same split as the oRPC link: the browser needs the public URL, SSR can take the internal one. */
const getBaseURL = createIsomorphicFn()
    .server(() => ENV.SERVER_URL)
    .client(() => ENV.VITE_SERVER_URL);

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
});

export const authMiddleware = createMiddleware().server(async ({ next, request }) => {
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
