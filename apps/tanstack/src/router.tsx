import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { deLocalizeUrl, localizeUrl } from '@xenous/i18n';
import { setupZodLocale } from '@xenous/i18n/zod';
import { orpc } from '~/orpc';
import { createQueryClient } from '~/orpc/query/client';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Here rather than in `server.ts` so the browser bundle gets it too.
setupZodLocale();

// Create a new router instance
export const getRouter = () => {
    const queryClient = createQueryClient();

    const router = createRouter({
        routeTree,
        // Routes are declared without a locale prefix: `input` strips it before
        // matching, `output` adds it back to hrefs.
        rewrite: {
            input: ({ url }) => deLocalizeUrl(url),
            output: ({ url }) => localizeUrl(url),
        },
        context: { queryClient, orpc },
        defaultPreload: 'intent', // run a route's loader as soon as a link is hovered or touched
        defaultPreloadStaleTime: 0, // let Query own freshness — Router's 30s preload cache would shadow it
        scrollRestoration: true,
    });

    setupRouterSsrQueryIntegration({ router, queryClient, wrapQueryClient: false });

    return router;
};

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof getRouter>;
    }
}
