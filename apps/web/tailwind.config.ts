import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

import web from '@xenous/tailwind-config/web';

const config = {
    content: [...web.content, '../../packages/ui/src/**/*.{ts,tsx}'],
    presets: [web],
    theme: {
        extend: {
            fontFamily: {
                'geist-sans': ['var(--font-geist-sans)', ...fontFamily.sans],
                'geist-mono': ['var(--font-geist-mono)', ...fontFamily.mono],
            },
        },
    },
} satisfies Config;

export default config;
