'use server';

import { revalidatePath as nextRevalidatePath, revalidateTag as nextRevalidateTag } from 'next/cache';

export const revalidatePath = (...args: Parameters<typeof nextRevalidatePath>) => {
    nextRevalidatePath(...args);
};

export const revalidateTag = (...args: Parameters<typeof nextRevalidateTag>) => {
    nextRevalidateTag(...args);
};
