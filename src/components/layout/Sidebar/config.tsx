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

export const navItems: NavItem[] = [
  {
    icon: <Dashboard />,
    label: "Dashboard",
    path: "/dashboard",
    type: "exact",
  },

  { icon: <Folder />, label: "Cases", path: "/cases", type: "prefix" },

  { icon: <People />, label: "Clients", path: "/clients", type: "prefix" },

  {
    icon: <AccountTree />,
    label: "Cases Pipeline",
    path: "/cases/pipeline",
    type: "exact",
  },

  {
    icon: <CalendarToday />,
    label: "Calendar",
    path: "/calendar",
    type: "exact",
  },

  {
    icon: <Description />,
    label: "Documents",
    path: "/documents",
    type: "prefix",
  },

  { icon: <AttachMoney />, label: "Billing", path: "/billing", type: "exact" },

  { icon: <Settings />, label: "Settings", path: "/settings", type: "exact" },
];
