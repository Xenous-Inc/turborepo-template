import path from 'node:path';
import { toORPCError } from '@orpc/client';
import { ORPCError, onError } from '@orpc/server';
import { RPCHandler } from '@orpc/server/fetch';
import { RequestHeadersPlugin, ResponseHeadersPlugin } from '@orpc/server/plugins';
import { logger } from '@xenous/logger';
import { defineHandler } from 'nitro/h3';
import { appRouter } from '~/routers';

/** Errors are constructed inside libraries, so the first frame outside them is our own call site. */
const getOrigin = (error: unknown) => {
    if (!(error instanceof Error) || typeof error.stack !== 'string') return undefined;

    for (const line of error.stack.split('\n').slice(1)) {
        if (line.includes('node_modules') || line.includes('node:internal')) continue;

        /**
         * A frame is either `at Object.handler (src/routers/todo.ts:17:20)` or, for an anonymous function,
         * a bare `at /abs/path/server.mjs:231:32`, so the parens are optional. `$` ties the match to the
         * `:row:col` pair at the very end, so an earlier colon in the path is not mistaken for it, and the
         * greedy `\S+` gives everything before that pair to the file path.
         */
        const frame = line.match(/\(?(\S+):(\d+):(\d+)\)?$/);

        if (frame === null) continue;

        const [, file, row, column] = frame;

        if (file === undefined) continue;

        const relative = path.relative(process.cwd(), file);

        /** A file outside the app root turns into `../..`, which reads worse than the full path. */
        return `${relative.startsWith('..') ? file : relative}:${row}:${column}`;
    }

    return undefined;
};

/** Unexpected throws all share one code, and consola prints only the message — the class is what is left. */
const getKind = (error: unknown) => {
    if (error instanceof ORPCError) return '';
    if (error instanceof Error) return ` ${error.constructor.name}`;

    return ` ${typeof error}`;
};

const rpcHandler = new RPCHandler(appRouter, {
    plugins: [new RequestHeadersPlugin(), new ResponseHeadersPlugin()],
    interceptors: [
        /** oRPC turns unexpected throws into INTERNAL_SERVER_ERROR and logs nothing; this runs before that. */
        onError((error, { request }) => {
            const { status, code } = toORPCError(error);
            const origin = getOrigin(error);

            /** Backticks render cyan in consola, matching the frames below. */
            const location = origin === undefined ? '' : ` (\`${origin}\`)`;
            const operation = `${request.method} ${new URL(request.url).pathname}${location}`;

            const head = `${operation} → ${status} ${code}${getKind(error)}`;

            /** 4xx is the contract working — rate limits, auth, validation — not a defect. */
            if (status < 500) {
                logger.warn(head, error);

                return;
            }

            logger.error(head, error);
        }),
    ],
});

export default defineHandler(async event => {
    const { matched, response } = await rpcHandler.handle(event.req, {
        prefix: '/rpc',
        context: event.context,
    });

    if (matched) return response;
});
