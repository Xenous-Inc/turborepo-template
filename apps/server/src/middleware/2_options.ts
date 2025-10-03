export default defineEventHandler(event => {
    if (event.node.req.method === 'OPTIONS') {
        setResponseHeader(event, 'Access-Control-Max-Age', 86400); // Cache preflight for 24 hours
        setResponseStatus(event, 204);

        return 'OK';
    }
});
