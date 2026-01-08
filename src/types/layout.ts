import { NotificationType } from "@/enums/layout";

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  read: boolean;
}
