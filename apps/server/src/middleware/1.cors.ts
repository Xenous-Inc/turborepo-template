import { defineMiddleware } from 'nitro/h3';
import { env } from '~/env';

export default defineMiddleware(async (event, next) => {
    const origin = event.req.headers.get('origin');

    event.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    event.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    event.res.headers.set('Access-Control-Allow-Credentials', 'true');

    if (origin && env.CORS_ORIGIN.includes(origin)) {
        event.res.headers.set('Access-Control-Allow-Origin', origin);
    }

    return await next();
});
