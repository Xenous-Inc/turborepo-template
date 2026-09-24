import { QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { ENV } from 'varlock/env';
import { TanstackQueryDevtools } from './query/devtools';

const ORPCProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    /**
     * The router owns the QueryClient — it is created per request in `getRouter` and handed to
     * `setupRouterSsrQueryIntegration`, which runs with `wrapQueryClient: false` because this provider
     * supplies it to React. Building one here instead would mint a second client on every server
     * render, leaving the loader's prefetched data in the router's client while SSR refetches into this one.
     *
     * {@link https://tanstack.com/start/latest/docs/framework/react/guide/tanstack-query | TanStack Start + Query}
     */
    const queryClient = useRouter().options.context.queryClient;

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {ENV.VITE_QUERY_DEVTOOLS_ENABLED && <TanstackQueryDevtools />}
        </QueryClientProvider>
    );
};

export { ORPCProvider };
