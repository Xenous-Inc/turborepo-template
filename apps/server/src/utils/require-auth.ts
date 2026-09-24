import { defineMiddleware, HTTPError } from 'nitro/h3';

/**
 * Middleware used to require authentication for a route.
 *
 * Can be extended to check for specific roles or permissions.
 */
export const requireAuth = defineMiddleware(async ({ context }) => {
    if (!(await context.getSession())) {
        throw new HTTPError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }
});
