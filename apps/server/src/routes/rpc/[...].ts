import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { RPCHandler } from '@orpc/server/fetch';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { appRouter } from '~/routers';

const rpcHandler = new RPCHandler(appRouter);

const apiHandler = new OpenAPIHandler(appRouter, {
    plugins: [
        new OpenAPIReferencePlugin({
            schemaConverters: [new ZodToJsonSchemaConverter()],
        }),
    ],
});

export default defineEventHandler(async event => {
    const context = await createContext({ event });

    const request = toWebRequest(event);

    const rpcResult = await rpcHandler.handle(request, {
        prefix: '/rpc',
        context,
    });

    if (rpcResult.matched) return rpcResult.response;

    const apiResult = await apiHandler.handle(request, {
        prefix: '/rpc/api',
        context: context,
    });

    if (apiResult.matched) return apiResult.response;
});
