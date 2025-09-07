export default defineEventHandler(event => {
    if (event.node.req.method === 'OPTIONS') {
        setResponseStatus(event, 200);
        return 'OK';
    }
});
