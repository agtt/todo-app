import { Resend } from "resend";
import type { MailProvider } from "@/types";
import { env } from "@/env";

const resend = new Resend(env.MAIL_RESEND_API);

export const resendProvider: MailProvider = {
  async send(to, subject, text) {
    await resend.emails.send({
      from: env.MAIL_FROM,
      to,
      subject,
      text,
    });
  },
};
