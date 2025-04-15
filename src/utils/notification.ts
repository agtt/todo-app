import { env } from "@/env";
import { MailProvider } from "@/types";

export const sendCompletionNotification = async (
  send: MailProvider["send"],
) => {
  await send(
    env.MAIL_RECEIPENT,
    "All tasks completed",
    "Congratulations! You have completed all your tasks.",
  );
};
