import type { RouterUtils } from '@orpc/tanstack-query';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';
import type { ORPCRouterClient } from '~/orpc';
import stylesheetUrl from '~/styles/globals.css?url';
import { Providers } from './-providers';

interface TanStackRouterContext {
    queryClient: QueryClient;
    orpc: RouterUtils<ORPCRouterClient>;
}

export const Route = createRootRouteWithContext<TanStackRouterContext>()({
    head: () => ({
        links: [
            {
                rel: 'stylesheet',
                href: stylesheetUrl,
            },
            {
                rel: 'manifest',
                href: '/manifest.json',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '96x96',
                url: '/favicon-96x96.png',
            },
            {
                rel: 'icon',
                type: 'image/svg+xml',
                url: '/favicon.svg',
            },
            {
                rel: 'shortcut icon',
                url: '/favicon.ico',
            },
            {
                rel: 'apple-touch-icon',
                type: 'image/png',
                sizes: '180x180',
                url: '/apple-touch-icon.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '96x96',
                url: '/favicon-96x96.png',
            },
        ],
        meta: [
            { charSet: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { title: 'Xenous' },
            { name: 'apple-mobile-web-app-title', content: 'Xenous' },
        ],
    }),
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className='bg-background font-sans text-foreground antialiased'>
                <Providers>
                    <div className='grid h-svh grid-rows-[auto_1fr]'>{children}</div>
                    <Scripts />
                </Providers>
            </body>
        </html>
    );
}
