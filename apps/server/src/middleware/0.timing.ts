import { defineMiddleware } from 'nitro/h3';
import { env } from '~/env';

export default defineMiddleware(async (event, next) => {
    const start = Date.now();

    if (env.NODE_ENV === 'development') {
        const waitMs = Math.floor(Math.random() * 400) + 100;
        await new Promise(resolve => setTimeout(resolve, waitMs));
    }

    const result = await next();

    if (env.NODE_ENV === 'development') {
        const end = Date.now();
        console.log(`[H3] ${event.url.toString()} took ${end - start}ms to execute`);
    }

    return result;
});
