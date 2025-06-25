import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin';

import base from './base';

const config = {
    content: base.content,
    presets: [base],
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                inherit: 'inherit',
            },
            borderRadius: {
                'inherit': 'inherit',
                '3xl': 'calc(var(--radius) * 3)',
                '2xl': 'calc(var(--radius) * 2)',
                'xl': 'calc(var(--radius) * 1.5)',
                'lg': 'var(--radius)',
                'md': 'calc(var(--radius) / 4 * 3)',
                'DEFAULT': 'calc(var(--radius) / 2)',
                'sm': 'calc(var(--radius) / 4)',
            },
            boxShadow: {
                '2xs': 'var(--shadow-2xs)',
                'xs': 'var(--shadow-xs)',
                'sm': 'var(--shadow-sm)',
                'DEFAULT': 'var(--shadow)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'xl': 'var(--shadow-xl)',
                '2xl': 'var(--shadow-2xl)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [
        animate,
        plugin(tw => {
            tw.addVariant('inert', '&:is([inert], [inert] *)');
            tw.addVariant('specificity', '&:not(#spc)');
        }),
    ],
} satisfies Config;

export default config;
