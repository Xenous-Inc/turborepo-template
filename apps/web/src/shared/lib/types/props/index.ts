type SearchParamsRecord = Record<string, string | string[] | undefined>;

type PropsWithSearchParams<T extends SearchParamsRecord = SearchParamsRecord> = {
    searchParams: Promise<T>;
};

type ParamsRecord = Record<string, string | string[]>;

type PropsWithParams<T extends ParamsRecord = ParamsRecord> = {
    params: Promise<T>;
};

export type { PropsWithSearchParams, PropsWithParams };
