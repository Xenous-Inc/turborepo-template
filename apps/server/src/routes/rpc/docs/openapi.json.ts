import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { defineRouteMeta } from 'nitro';
import { defineHandler } from 'nitro/h3';
import { env } from '~/env';
import { appRouter } from '~/routers';

const openapiHandler = new OpenAPIHandler(appRouter, {
    plugins: [
        new OpenAPIReferencePlugin({
            specPath: '/',
            specGenerateOptions: event => ({
                servers: [{ url: `${event.request.url.origin}/rpc` }],
                info: {
                    title: 'oRPC',
                    description:
                        'API Reference for oRPC Instance. To use this make sure to setup <a href="https://orpc.dev/docs/client/client-side" target="_blank" rel="noreferrer">oRPC Client</a>',
                    version: env.VERSION,
                },
            }),
            schemaConverters: [new ZodToJsonSchemaConverter()],
        }),
    ],
});

defineRouteMeta({
    openAPI: {
        tags: ['OpenAPI'],
        description: 'oRPC OpenAPI Schema',
    },
});

export default defineHandler(async event => {
    const { matched, response } = await openapiHandler.handle(event.req, {
        prefix: '/rpc/docs/openapi.json',
        context: event.context,
    });

    if (matched) return response;
});
