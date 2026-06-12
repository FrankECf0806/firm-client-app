import { SvgIconComponent } from "@mui/icons-material";

export interface SidebarProps {
  sidebarExpanded?: boolean;
  onToggleSidebar: () => void;
}

export interface SidebarNavItemProps {
  icon: SvgIconComponent;
  label: string;
  path: string;
  active: boolean;
  expanded: boolean;
}

export interface NavItem {
  icon: SvgIconComponent;
  label: string;
  path: string;
  type: string;
  normalizedPath: string;
}

export interface SidebarNavProps {
  items: NavItem[];
  expanded: boolean;
  isActive: (item: NavItem) => boolean;
}

export interface SidebarFooterProps {
  sidebarExpanded?: boolean;
}
