import z from 'zod';

export const preprocessMap = <Key extends z.ZodTypeAny = z.ZodTypeAny, Value extends z.ZodTypeAny = z.ZodTypeAny>(
    mapSchema: z.ZodMap<Key, Value>,
) => {
    return z.preprocess(data => {
        if (typeof data !== 'object' || data === null) return data;

        const map = new Map();
        const entries = Object.entries(data);

        for (const [key, value] of entries) {
            map.set(key, value);
        }

        return map;
    }, mapSchema);
};
