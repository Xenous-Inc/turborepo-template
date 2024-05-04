import type { ZodType } from 'zod';

export const defaultValues = <T extends ZodType>(input: T['_input']) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return input as T['_output'];
};
