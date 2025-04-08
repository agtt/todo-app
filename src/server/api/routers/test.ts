import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { addTodo } from "@/lib/models/todo";

export const testRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      // This is a test to see if the database is connected
      // and if the addTodo function works
      addTodo(input.text);

      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
