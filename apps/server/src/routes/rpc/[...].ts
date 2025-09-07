import { RPCHandler } from '@orpc/server/fetch';
import { appRouter } from '~/routers';

const handler = new RPCHandler(appRouter);

export default defineEventHandler(async event => {
    const context = await createContext({ event });

    const request = toWebRequest(event);

    const { matched, response } = await handler.handle(request, {
        prefix: '/rpc',
        context,
    });

    if (matched) return response;
});
