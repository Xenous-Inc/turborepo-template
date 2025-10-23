import { db } from '@xenous/db/client';
import { todo } from '@xenous/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod/v4';

export const todoRouter = o.router({
    getAll: publicProcedure.handler(async () => {
        return await db.select().from(todo);
    }),

    create: publicProcedure.input(z.object({ text: z.string().min(1) })).handler(async ({ input }) => {
        const result = await db
            .insert(todo)
            .values({
                text: input.text,
            })
            .returning();
        return result[0];
    }),

    toggle: publicProcedure.input(z.object({ id: z.number(), completed: z.boolean() })).handler(async ({ input }) => {
        await db.update(todo).set({ completed: input.completed }).where(eq(todo.id, input.id));
        return { success: true };
    }),

    delete: publicProcedure.input(z.object({ id: z.number() })).handler(async ({ input }) => {
        await db.delete(todo).where(eq(todo.id, input.id));
        return { success: true };
    }),
});
