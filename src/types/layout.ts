import { NotificationType } from "@/enums/layout";
import { SvgIconComponent } from "@mui/icons-material";
import { ReactNode } from "react";

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface MetaDataItem {
  label: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  size?: "small" | "medium";
  icon?: SvgIconComponent;
  variant?: "outlined" | "filled" | "standard";
  className?: string;
}

export interface ManagementProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  showHeader?: boolean;
  metadata?: MetaDataItem[];
  metadataPosition?: "inline" | "below";
}

export interface PageItem {
  title: string;
  subtitle?: string;
}
