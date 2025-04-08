import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// Server-side env (Next.js)
const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.string().url(),
});

// Client-side env (Next.js)
const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

// Parse env
const serverEnv = serverSchema.parse(process.env);
const clientEnv = clientSchema.parse(process.env);

// Export env
export const env = {
  ...serverEnv,
  ...clientEnv,
};
