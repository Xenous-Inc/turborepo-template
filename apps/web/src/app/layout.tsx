import '@xenous/ui/styles';

import { cn } from '@xenous/ui/lib';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './(_providers)';

const geistSans = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
});

export const metadata: Metadata = {
    title: 'Xenous',
    appleWebApp: { title: 'Xenous' },
    manifest: '/manifest.json',
    icons: [
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
};

export default ({ children }: React.PropsWithChildren) => {
    return (
        <html lang={'en'} suppressHydrationWarning>
            <body
                className={cn(
                    'bg-background font-geist-sans text-foreground antialiased',
                    geistSans.variable,
                    geistMono.variable,
                )}
            >
                <Providers>
                    <div className={'grid h-svh grid-rows-[auto_1fr]'}>{children}</div>
                </Providers>
            </body>
        </html>
    );
};
