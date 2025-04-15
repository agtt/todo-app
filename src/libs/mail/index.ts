import "server-only";
import { resendProvider } from "./provider/resend";
import type { MailProvider } from "@/types";
import { env } from "@/env";

const providers: Record<string, MailProvider> = {
  resend: resendProvider,
};

const providerKey = env.MAIL_PROVIDER || "resend";
const selectedProvider = providers[providerKey];

if (!selectedProvider) {
  throw new Error(`Invalid mail provider: ${providerKey}`);
}

export const mail = selectedProvider;
