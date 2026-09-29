import stylesheetUrl from '~/styles/globals.css?url';

/** Keep as module imports — fontaine cannot see through a CSS `@import`. */
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@fontsource-variable/unbounded/wght.css';

import type { RouterUtils } from '@orpc/tanstack-query';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';
import { getLocale, getTextDirection } from '@xenous/i18n';
import { m } from '@xenous/i18n/messages';
import type { ORPCRouterClient } from '~/orpc';
import { Providers } from './-providers';
import { DEFAULT_THEME, themeInitScript } from './-providers/theme-provider';

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
            { title: m.common_meta_title() },
            { name: 'description', content: m.common_meta_description() },
            { name: 'apple-mobile-web-app-title', content: 'Xenous' },
        ],
    }),
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang={getLocale()} dir={getTextDirection()} className={DEFAULT_THEME} suppressHydrationWarning>
            <head>
                <HeadContent />
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
