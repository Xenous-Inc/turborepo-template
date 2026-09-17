import { createMiddleware, createServerFn } from '@tanstack/react-start';
import { createAuthClient } from 'better-auth/react';
import { ENV } from 'varlock/env';

export const authClient = createAuthClient({
    baseURL: ENV.VITE_SERVER_URL,
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
