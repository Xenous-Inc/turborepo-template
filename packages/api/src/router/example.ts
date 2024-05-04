import { createTRPCRouter, publicProcedure } from '../trpc';

export const exampleRouter = createTRPCRouter({
    ping: publicProcedure.query(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return null;
    }),
});
