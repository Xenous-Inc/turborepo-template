// import type { TRPCRouterRecord } from "@trpc/server";
// import { z } from "zod";
//
// import { CreatePostSchema } from "@acme/schema";
//
// import { protectedProcedure, publicProcedure } from "../trpc";
//
// export const postRouter = {
//   all: publicProcedure.query(({ ctx }) => {
//     // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
//     return [];
//   }),
//
//   byId: publicProcedure
//     .input(z.object({ id: z.number() }))
//     .query(({ ctx, input }) => {
//       return undefined;
//     }),
//
//   create: protectedProcedure
//     .input(CreatePostSchema)
//     .mutation(({ ctx, input }) => {
//       return undefined;
//     }),
//
//   delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
//     return undefined;
//   }),
// } satisfies TRPCRouterRecord;
