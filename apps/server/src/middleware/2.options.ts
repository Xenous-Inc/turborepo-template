import { defineMiddleware } from 'nitro/h3';

export default defineMiddleware(event => {
    if (event.req.method === 'OPTIONS') {
        event.res.headers.set('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours
        event.res.status = 204;

        return 'OK';
    }
});
