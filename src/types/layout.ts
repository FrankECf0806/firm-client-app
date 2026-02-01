import { NotificationType } from "@/enums/layout";
import { ReactNode } from "react";

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

export interface ManagementProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: ReactNode;
  showHeader?: boolean;
}

export interface PageItem {
  title: string;
  subtitle?: string;
}
