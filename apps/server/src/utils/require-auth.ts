import type { EventHandler } from 'h3';

/**
 * Middleware used to require authentication for a route.
 *
 * Can be extended to check for specific roles or permissions.
 */
export const requireAuth: EventHandler = async event => {
    const session = await auth.api.getSession({ headers: event.headers });

    if (!session) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }

    event.context = { ...event.context, ...createContext({ event }) };
};
