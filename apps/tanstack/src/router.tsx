import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { orpc } from '~/orpc';
import { createQueryClient } from '~/orpc/query/client';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
    const queryClient = createQueryClient();

    const router = createRouter({
        routeTree,
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
