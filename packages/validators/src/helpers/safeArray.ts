import z from 'zod';

export const safeArray = <T extends z.ZodType>(schema: T) => {
    return z
        .array(schema.optional().catch(undefined))
        .transform<T['_output'][]>(data => data.filter(value => value !== undefined))
        .catch([])
        .pipe(z.array(schema));
};
