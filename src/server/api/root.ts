import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { todoRouter } from "./routers/todo";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.test.all();
 *       ^? Test[]
 */
export const createCaller = createCallerFactory(appRouter);
