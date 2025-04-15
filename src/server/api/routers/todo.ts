import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { sendCompletionNotification } from "@/utils/notification";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.models.todo.getTodos();
  }),

  add: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const id = await ctx.models.todo.addTodo(input.text);
      return { id };
    }),

  toggle: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { toggleTodo, areAllTodosComplete } = ctx.models.todo;

      const count = await toggleTodo(input.id);

      await sendCompletionNotification({
        provider: ctx.mail,
        areAllTodosComplete,
      });

      return { count };
    }),

  remove: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { removeTodo, areAllTodosComplete } = ctx.models.todo;
      const count = await removeTodo(input.id);

      await sendCompletionNotification({
        provider: ctx.mail,
        areAllTodosComplete,
      });

      return { count };
    }),
});
