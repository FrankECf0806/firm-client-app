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
  { icon: <Dashboard />, label: "Dashboard", path: "/dashboard" },
  { icon: <Folder />, label: "Cases", path: "/cases" },
  { icon: <People />, label: "Clients", path: "/clients" },
  { icon: <AccountTree />, label: "Cases Pipeline", path: "/cases/pipeline" },
  { icon: <CalendarToday />, label: "Calendar", path: "/calendar" },
  { icon: <Description />, label: "Documents", path: "/documents" },
  { icon: <AttachMoney />, label: "Billing", path: "/billing" },
  { icon: <Settings />, label: "Settings", path: "/settings" },
];
