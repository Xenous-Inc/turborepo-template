'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className='toaster group'
            toastOptions={{
                classNames: {
                    toast: 'group toast group-[.toaster]:bg-argent-800 group-[.toaster]:text-primary group-[.toaster]:border-argent-700 group-[.toaster]:shadow-lg',
                    description: 'group-[.toast]:text-secondary',
                    actionButton: 'group-[.toast]:bg-argent-700 group-[.toast]:text-primary',
                    cancelButton: 'group-[.toast]:bg-argent-700 group-[.toast]:text-secondary',
                },
            }}
            {...props}
        />
    );
};

export { Toaster, toast };
