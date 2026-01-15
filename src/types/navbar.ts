import { ReactNode } from "react";

export interface SidebarProps {
  sidebarExpanded?: boolean;
  onToggleSidebar: () => void;
}

export interface SidebarNavItemProps {
  icon: ReactNode;
  label: string;
  path: string;
  active: boolean;
  expanded: boolean;
}

export interface NavItem {
  icon: ReactNode;
  label: string;
  path: string;
}

export interface SidebarNavProps {
  items: NavItem[];
  expanded: boolean;
  isActive: (path: string) => boolean;
}

export interface SidebarFooterProps {
  sidebarExpanded?: boolean;
}
