import { defineMiddleware, HTTPError } from 'nitro/h3';

/**
 * Middleware used to require authentication for a route.
 *
 * Can be extended to check for specific roles or permissions.
 */
export const requireAuth = defineMiddleware(async event => {
    if (!event.context.session || !event.context.user) {
        throw new HTTPError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }
});
