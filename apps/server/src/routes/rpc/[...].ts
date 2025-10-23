import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { RPCHandler } from '@orpc/server/fetch';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { defineHandler } from 'nitro/h3';
import { appRouter } from '~/routers';

const rpcHandler = new RPCHandler(appRouter);

const apiHandler = new OpenAPIHandler(appRouter, {
    plugins: [
        new OpenAPIReferencePlugin({
            schemaConverters: [new ZodToJsonSchemaConverter()],
        }),
    ],
});

export default defineHandler(async event => {
    const rpcResult = await rpcHandler.handle(event.req, {
        prefix: '/rpc',
        context: event.context,
    });

    if (rpcResult.matched) return rpcResult.response;

    const apiResult = await apiHandler.handle(event.req, {
        prefix: '/rpc/api',
        context: event.context,
    });

    if (apiResult.matched) return apiResult.response;
});
