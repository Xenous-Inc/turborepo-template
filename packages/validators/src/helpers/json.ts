import z from 'zod';

export const jsonSchema = z.preprocess(data => {
    if (typeof data !== 'string') return undefined;

    try {
        return JSON.parse(data);
    } catch {
        return undefined;
    }
}, z.any());

export type JsonSchema = typeof jsonSchema;
