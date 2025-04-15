import { MailProvider } from "@/types";
import { sendCompletionNotification } from "../notification";

jest.mock("@/env", () => ({
    env: {
      DATABASE_URL: "mongodb://localhost:27017/test-db",
      MAIL_PROVIDER: "smtp",
      MAIL_FROM: "no-reply@example.com",
      MAIL_RECEIPENT: "test@example.com",
    },
  }));

  
describe("sendCompletionNotification", () => {
  const mockSend = jest.fn();
  const mockConsoleError = jest.spyOn(console, "error").mockImplementation(() => {});

  const provider: MailProvider = {
    send: mockSend,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send email if all todos are complete", async () => {
    const areAllTodosComplete = jest.fn().mockResolvedValue(true);

    await sendCompletionNotification({ provider, areAllTodosComplete });

    expect(areAllTodosComplete).toHaveBeenCalled();
    expect(mockSend).toHaveBeenCalledWith(
      expect.any(String),
      "All tasks completed",
      "Congratulations! You have completed all your tasks.",
    );
  });

  it("should NOT send email if todos are not complete", async () => {
    const areAllTodosComplete = jest.fn().mockResolvedValue(false);

    await sendCompletionNotification({ provider, areAllTodosComplete });

    expect(areAllTodosComplete).toHaveBeenCalled();
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("should handle errors gracefully", async () => {
    const areAllTodosComplete = jest.fn().mockResolvedValue(true);
    mockSend.mockRejectedValueOnce(new Error("SMTP error"));

    await sendCompletionNotification({ provider, areAllTodosComplete });

    expect(mockSend).toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error sending email:",
      expect.any(Error),
    );
  });
});
