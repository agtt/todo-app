import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// Server-side env (Next.js)
const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.string().url(),
  MAIL_PROVIDER: z.enum(["resend", "sendgrid", "mailgun", "smtp"]),
  MAIL_FROM: z.string().email(),
  MAIL_RESEND_API: z.string().optional(),
  MAIL_RECEIPENT: z.string().email(),
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
