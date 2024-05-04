import type { JSXElementConstructor } from 'react';

type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

export type PropsOf<TTag extends ReactTag> = TTag extends React.ElementType ? React.ComponentProps<TTag> : never;

export type EnumType<T> = T[keyof T];

export type SearchParams<
    T extends Record<string, string | string[] | undefined> = Record<string, string | string[] | undefined>,
> = {
    searchParams: T & Record<string, string | string[] | undefined>;
};

export type QueryParams<T extends Record<string, string | string[]> = Record<string, string | string[]>> = {
    params: T & Record<string, string | string[]>;
};
