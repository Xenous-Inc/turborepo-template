import { env } from '~/env';

export default defineEventHandler(event => {
    const origin = getHeader(event, 'origin');

    setResponseHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    setResponseHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');
    setResponseHeader(event, 'Access-Control-Allow-Credentials', 'true');

    if (origin && env.CORS_ORIGIN.includes(origin)) {
        setResponseHeader(event, 'Access-Control-Allow-Origin', origin);
    }
});
