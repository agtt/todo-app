import "server-only";
import { resendProvider } from "./resend";
import type { MailProvider } from "@/types";

const providers: Record<string, MailProvider> = {
  resend: resendProvider,
};

const providerKey = process.env.MAIL_PROVIDER || "resend";
const selectedProvider = providers[providerKey];

if (!selectedProvider) {
  throw new Error(`Invalid mail provider: ${providerKey}`);
}

export const mail = selectedProvider;
