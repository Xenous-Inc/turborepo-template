import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { orpc } from '~/orpc';
import { getQueryClient } from '~/orpc/query/client';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
    const queryClient = getQueryClient();

    const router = createRouter({
        routeTree,
        context: { queryClient, orpc },
        defaultPreload: 'intent',
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
