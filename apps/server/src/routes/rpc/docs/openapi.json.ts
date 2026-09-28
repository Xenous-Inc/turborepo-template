import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { defineRouteMeta } from 'nitro';
import { defineHandler } from 'nitro/h3';
import { useRuntimeConfig } from 'nitro/runtime-config';
import { appRouter } from '~/routers';

const forwardedOrigin = ({
    url,
    headers,
}: {
    url: URL;
    headers: Record<string, string | readonly string[] | undefined>;
}) => {
    const header = headers['x-forwarded-proto'];
    const proto = (typeof header === 'string' ? header : header?.[0])?.split(',')[0]?.trim();

    const forwarded = new URL(url);
    if (proto === 'https') forwarded.protocol = 'https:';

    return forwarded.origin;
};

const openapiHandler = new OpenAPIHandler(appRouter, {
    plugins: [
        new OpenAPIReferencePlugin({
            specPath: '/',
            specGenerateOptions: ({ request }) => ({
                // The proxy terminates TLS, so the request Nitro sees is http and Scalar would
                // call an http server URL from an https page. srvx does not trust forwarded headers.
                servers: [{ url: `${forwardedOrigin(request)}/rpc` }],
                info: {
                    title: 'oRPC',
                    description:
                        'API Reference for oRPC Instance. To use this make sure to setup <a href="https://orpc.dev/docs/client/client-side" target="_blank" rel="noreferrer">oRPC Client</a>',
                    version: useRuntimeConfig().version,
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
