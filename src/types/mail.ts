export interface MailProvider {
  send: (to: string, subject: string, text: string) => Promise<void>;
}
