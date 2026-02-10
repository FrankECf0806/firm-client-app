export interface Communication {
  id: string;
  clientName: string;
  clientId: string;
  type: "email" | "call" | "message";
  subject: string;
  time: string;
  unread: boolean;
}
