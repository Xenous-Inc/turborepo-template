'use client';

import type { VariantProps } from 'class-variance-authority';
import type { LongPressProps, PressProps } from 'react-aria';
import { forwardRef } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { mergeProps, useLongPress, usePress } from 'react-aria';

import { cn } from '@xenous/ui';

import { Spinner } from '../../spinner';

const buttonVariants = cva(
    'relative inline-flex items-center justify-center gap-x-2.5 rounded-16 outline-none disabled:cursor-not-allowed disabled:bg-opacity-50 motion-safe:transition-all motion-safe:duration-300',
    {
        variants: {
            variant: {
                icon: 'p-1.5',
                primary:
                    'bg-accent px-6 py-3 text-primary focus:ring-[3px] focus:ring-accent/50 disabled:text-primary/50',
                outline:
                    'px-6 py-3 text-accent outline outline-[1.5px] -outline-offset-2 outline-accent focus:ring-[3px] focus:ring-accent/50 disabled:text-secondary disabled:outline-secondary',
                ghost: 'px-6 py-3 text-secondary outline-none focus:underline',
            },
        },
        defaultVariants: {
            variant: 'primary',
        },
    }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        loading?: boolean;
    } & {
        onPress?: PressProps['onPress'];
        onLongPress?: LongPressProps['onLongPress'];
        onLongPressStart?: LongPressProps['onLongPressStart'];
        onLongPressEnd?: LongPressProps['onLongPressEnd'];
    };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            type,
            className,
            variant,
            onPress,
            onLongPress,
            onLongPressStart,
            onLongPressEnd,
            loading = false,
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button';

        const { pressProps } = usePress({ onPress });

        const { longPressProps } = useLongPress({ onLongPress, onLongPressStart, onLongPressEnd });

        return (
            <Comp
                ref={ref}
                type={type ?? 'button'}
                className={cn(
                    buttonVariants({ variant, className }),
                    loading && 'cursor-wait select-none fill-transparent text-transparent opacity-50'
                )}
                {...props}
                {...mergeProps(pressProps, longPressProps)}
            >
                <Slottable>{props.children}</Slottable>
                {loading && <Spinner variant={variant} className={'absolute'} />}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button };
