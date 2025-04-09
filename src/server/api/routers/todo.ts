import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { models } from "@/lib/models";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await models.todo.getTodos();
  }),

  add: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const id = await models.todo.addTodo(input.text);
      return { id };
    }),

  toggle: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const count = await models.todo.toggleTodo(input.id);
      return { count };
    }),

  remove: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const count = await models.todo.removeTodo(input.id);
      return { count };
    }),
});
