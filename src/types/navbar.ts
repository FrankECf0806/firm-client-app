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
  type: string;
}

export interface SidebarNavProps {
  items: NavItem[];
  expanded: boolean;
  isActive: (item: NavItem) => boolean;
}

export interface SidebarFooterProps {
  sidebarExpanded?: boolean;
}
