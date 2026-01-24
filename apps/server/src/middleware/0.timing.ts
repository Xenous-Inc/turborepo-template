import { logger } from '@xenous/logger';
import { defineMiddleware } from 'nitro/h3';
import { env } from '~/env';

export default defineMiddleware(async (event, next) => {
    if (env.NODE_ENV !== 'development') {
        return await next();
    }

    const start = Date.now();

    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise(resolve => setTimeout(resolve, waitMs));

    const result = await next();

    const end = Date.now();
    logger.withTag('H3').debug(`${event.req.method} ${event.url.toString()} took ${end - start}ms to execute`);

    return result;
});
