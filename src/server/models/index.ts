import "server-only";

import * as todo from "./todo";

export const models = {
  todo,
} as const;

export type Models = typeof models;
