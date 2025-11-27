import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            color: [
                'background',
                'foreground',
                'card',
                'card-foreground',
                'popover',
                'popover-foreground',
                'primary',
                'primary-foreground',
                'secondary',
                'secondary-foreground',
                'muted',
                'muted-foreground',
                'accent',
                'accent-foreground',
                'destructive',
                'destructive-foreground',
                'border',
                'input',
                'ring',
                'chart-1',
                'chart-2',
                'chart-3',
                'chart-4',
                'chart-5',
                'sidebar',
                'sidebar-foreground',
                'sidebar-primary',
                'sidebar-primary-foreground',
                'sidebar-accent',
                'sidebar-accent-foreground',
                'sidebar-border',
                'sidebar-ring',
            ],
            font: ['sans', 'serif', 'mono'],
            spacing: ['popup-min-width', 'popup-max-width', 'popup-min-height', 'popup-max-height'],
        },
    },
});

export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};
