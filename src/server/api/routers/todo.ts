import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.models.todo.getTodos();
  }),

  add: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const id = await ctx.models.todo.addTodo(input.text);
      return { id };
    }),

  toggle: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const count = await ctx.models.todo.toggleTodo(input.id);
      return { count };
    }),

  remove: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const count = await ctx.models.todo.removeTodo(input.id);
      return { count };
    }),
});
