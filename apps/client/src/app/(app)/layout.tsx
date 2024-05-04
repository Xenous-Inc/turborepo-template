import type { Metadata, Viewport } from 'next';
import { Noto_Sans } from 'next/font/google';

import { cn } from '@xenous/ui';

import '~/styles/globals.scss';

import { Providers } from '../(_providers)';

export const metadata: Metadata = {
    title: 'Xenous',
    description: 'Xenous',
    icons: [
        { rel: 'icon', url: '/favicon.ico' },
        { rel: 'manifest', url: '/site.webmanifest' },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            url: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicon-16x16.png',
        },
    ],
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

const notoSans = Noto_Sans({
    subsets: ['latin', 'cyrillic'],
    weight: 'variable',
    variable: '--font-noto-sans',
});

export default ({ children }: React.PropsWithChildren) => {
    return (
        <html suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    'min-h-[100dvh] w-full min-w-fit',
                    'font-noto-sans text-primary antialiased',
                    notoSans.variable
                )}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};
