import { NavItem } from "@/types/navbar";
import {
  Dashboard,
  Folder,
  People,
  CalendarToday,
  Description,
  AttachMoney,
  Settings,
  AccountTree,
} from "@mui/icons-material";

const navItemsList = [
  {
    icon: Dashboard,
    label: "Dashboard",
    path: "/dashboard",
    type: "exact",
  },

  { icon: Folder, label: "Cases", path: "/cases", type: "prefix" },

  { icon: People, label: "Clients", path: "/clients", type: "prefix" },

  {
    icon: AccountTree,
    label: "Cases Pipeline",
    path: "/cases/pipeline",
    type: "exact",
  },

  {
    icon: CalendarToday,
    label: "Calendar",
    path: "/calendar",
    type: "exact",
  },

  {
    icon: Description,
    label: "Documents",
    path: "/documents",
    type: "prefix",
  },

  { icon: AttachMoney, label: "Billing", path: "/billing", type: "exact" },

  { icon: Settings, label: "Settings", path: "/settings", type: "exact" },
];

export const navItems: NavItem[] = navItemsList.map((item) => ({
  ...item,
  normalizedPath:
    item.path.endsWith("/") && item.path !== "/"
      ? item.path.slice(0, -1)
      : item.path,
}));
