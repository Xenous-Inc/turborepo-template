import type { Config } from 'tailwindcss';

const config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        // fontSize: {
        //     '12': ['0.75rem', { lineHeight: '1.25rem' }],
        //     '14': ['0.875rem', { lineHeight: '1.25rem' }],
        //     '16': ['1rem', { lineHeight: '1.5rem' }],
        //     '18': ['1.125rem', { lineHeight: '1.75rem' }],
        //     '20': ['1.25rem', { lineHeight: '1.75rem' }],
        //     '24': ['1.5rem', { lineHeight: '2rem' }],
        //     '32': ['2rem', { lineHeight: '2.25rem' }],
        //     '36': ['2.25rem', { lineHeight: '2.5rem' }],
        //     '48': ['3rem', { lineHeight: '1' }],
        //     '64': ['4rem', { lineHeight: '1' }],
        //     '96': ['6rem', { lineHeight: '1' }],
        // },
        // fontWeight: {
        //     '100': '100',
        //     '200': '200',
        //     '300': '300',
        //     '400': '400',
        //     '500': '500',
        //     '600': '600',
        //     '700': '700',
        //     '800': '800',
        //     '900': '900',
        // },
        extend: {
            colors: {
                inherit: 'inherit',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
            },
            minWidth: {
                popup: 'var(--popup-min-width)',
            },
            maxWidth: {
                popup: 'var(--popup-max-width)',
            },
            minHeight: {
                popup: 'var(--popup-min-height)',
            },
            maxHeight: {
                popup: 'var(--popup-max-height)',
            },
            zIndex: {
                100: '100',
                200: '200',
                300: '300',
                400: '400',
                500: '500',
            },
        },
    },
} satisfies Config;

export default config;
