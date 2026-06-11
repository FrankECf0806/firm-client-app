import { NotificationSeverity, NotificationType } from "@/enums/notifcation";
import {
  ALL_NOTIFICATION_SEVERITY,
  ALL_NOTIFICATION_TYPES,
} from "@/utils/constant/notification";

// Notification Types
export type NotificationTypeKey = keyof typeof NotificationType;
export type NotificationTypeFilter =
  | NotificationTypeKey
  | typeof ALL_NOTIFICATION_TYPES;

// Notification Severity
export type NotificationSeverityKey = keyof typeof NotificationSeverity;
export type NotificationSeverityFilter =
  | NotificationSeverityKey
  | typeof ALL_NOTIFICATION_SEVERITY;

export interface Notification {
  id: string;
  title: string;
  subtitle: string;
  createdAt: string;
  read: boolean;
  showTimestamp: boolean;
  type: NotificationTypeKey;
  severity: NotificationSeverityKey;
  entityId?: string;
  entityType?: string;
  url?: string;
}
