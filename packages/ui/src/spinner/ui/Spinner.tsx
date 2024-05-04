import type { VariantProps } from 'class-variance-authority';
import { forwardRef, memo } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@xenous/ui';

const spinnerVariants = cva('animate-spin motion-safe:duration-700', {
    variants: {
        variant: {
            icon: 'fill-primary',
            primary: 'fill-primary',
            outline: 'fill-accent',
            ghost: 'fill-secondary',
            link: 'fill-secondary',
        },
        size: {
            sm: 'h-6 w-6',
            md: 'h-8 w-8',
            lg: 'h-10 w-10',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    },
});

type SpinnerProps = React.SVGAttributes<SVGSVGElement> & VariantProps<typeof spinnerVariants>;

const Spinner = memo(
    forwardRef<SVGSVGElement, SpinnerProps>(({ className, variant, size, ...props }, ref) => {
        return (
            <svg
                ref={ref}
                width={24}
                height={24}
                viewBox={'0 0 24 24'}
                xmlns={'http://www.w3.org/2000/svg'}
                className={cn(spinnerVariants({ variant, size, className }))}
                {...props}
            >
                <path
                    fillRule={'evenodd'}
                    clipRule={'evenodd'}
                    d={
                        'M16.3938 5.0765C14.8945 4.12503 13.1269 3.68595 11.3566 3.82527C9.58641 3.96459 7.90923 4.67479 6.57725 5.84908C5.24527 7.02338 4.33047 8.59832 3.97038 10.3371C3.61029 12.076 3.82437 13.8847 4.58043 15.4914C4.79206 15.9411 4.59903 16.4773 4.14928 16.6889C3.69953 16.9006 3.16337 16.7075 2.95174 16.2578C2.02971 14.2984 1.76864 12.0926 2.20778 9.97212C2.64692 7.85161 3.76252 5.93095 5.38689 4.49888C7.01126 3.06681 9.05659 2.20072 11.2154 2.03082C13.3742 1.86092 15.5299 2.39638 17.3583 3.55671C19.1867 4.71705 20.589 6.43954 21.3545 8.46525C22.1199 10.4909 22.2071 12.7104 21.6029 14.7899C20.9988 16.8694 19.7359 18.6966 18.0042 19.9968C16.2725 21.2971 14.1655 22 12 22C11.503 22 11.1 21.597 11.1 21.1C11.1 20.6029 11.503 20.2 12 20.2C13.7757 20.2 15.5034 19.6236 16.9235 18.5574C18.3435 17.4912 19.379 15.9929 19.8744 14.2877C20.3698 12.5825 20.2983 10.7626 19.6707 9.1015C19.043 7.44042 17.8931 6.02798 16.3938 5.0765Z'
                    }
                />
            </svg>
        );
    })
);
Spinner.displayName = 'Spinner';

export { Spinner };
