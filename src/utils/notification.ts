import { env } from "@/env";
import { MailProvider } from "@/types";

interface INotification {
  provider: MailProvider;
  areAllTodosComplete: () => Promise<boolean>;
}

export const sendCompletionNotification = async ({
  provider,
  areAllTodosComplete,
}: INotification): Promise<void> => {
  try {
    const allComplete = await areAllTodosComplete();
    if (!allComplete) return;

    await provider.send(
      env.MAIL_RECEIPENT,
      "All tasks completed",
      "Congratulations! You have completed all your tasks.",
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
