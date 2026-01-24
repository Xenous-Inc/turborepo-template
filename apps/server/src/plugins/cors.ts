import { definePlugin } from 'nitro';
import type { HTTPEvent } from 'nitro/deps/h3';
import { env } from '~/env';

export default definePlugin(async nitro => {
    nitro.hooks.hook('response', (res: Response, event: HTTPEvent) => {
        const origin = event.req.headers.get('origin');

        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.headers.set('Access-Control-Allow-Credentials', 'true');

        if (origin && env.CORS_ORIGIN.includes(origin)) {
            res.headers.set('Access-Control-Allow-Origin', origin);
        }
    });
});
