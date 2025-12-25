import { RPCHandler } from '@orpc/server/fetch';
import { RequestHeadersPlugin, ResponseHeadersPlugin } from '@orpc/server/plugins';
import { defineHandler } from 'nitro/h3';
import { appRouter } from '~/routers';

const rpcHandler = new RPCHandler(appRouter, {
    plugins: [new RequestHeadersPlugin(), new ResponseHeadersPlugin()],
});

export default defineHandler(async event => {
    const { matched, response } = await rpcHandler.handle(event.req, {
        prefix: '/rpc',
        context: event.context,
    });

    if (matched) return response;
});
