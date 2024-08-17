'use client';

import type { ElementRef } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@xenous/ui';

import type { PropsOf } from '~/shared/lib';

type CollapsableTextProps = PropsOf<'span'> & {
    lines: number;
};

export default ({ lines, ...props }: CollapsableTextProps) => {
    const [ref, setRef] = useState<ElementRef<'span'> | null>(null);
    const [open, setOpen] = useState(false);

    const clientWidth = useRef(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);

    const textClamped = useMemo(() => clientHeight < scrollHeight, [clientHeight, scrollHeight]);

    useEffect(() => {
        if (!ref) return;

        setClientHeight(ref.clientHeight);
        setScrollHeight(ref.scrollHeight);

        const listener = () => {
            if (clientWidth.current === ref.clientWidth) return;

            clientWidth.current = ref.clientWidth;
            setClientHeight(ref.clientHeight);
            setScrollHeight(ref.scrollHeight);
        };

        window.addEventListener('resize', listener);

        return () => window.removeEventListener('resize', listener);
    }, [ref]);

    return (
        <>
            <span
                {...props}
                ref={setRef}
                className={cn('hyphens-auto', props.className)}
                style={{
                    ...props.style,
                    overflow: open ? props.style?.overflow : 'hidden',
                    display: open ? props.style?.display : '-webkit-box',
                    WebkitBoxOrient: open ? props.style?.WebkitBoxOrient : 'vertical',
                    WebkitLineClamp: open ? props.style?.WebkitLineClamp : lines,
                }}
            />
            {textClamped && (
                <span className={'duration-500 animate-in fade-in'}>
                    <button
                        type={'button'}
                        className={'whitespace-pre text-accent'}
                        onClick={() => setOpen(prev => !prev)}
                    >
                        {open ? ' Свернуть' : 'Показать полностью'}
                    </button>
                </span>
            )}
        </>
    );
};
