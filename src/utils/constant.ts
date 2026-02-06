import { PageItem } from "@/types/layout";

// Upload File
export const MAX_FILES = 10;

// Management Layout
export const defaultSourcePath = { label: "Dashboard", href: "/dashboard" };
export const pageConfig: Record<string, PageItem> = {
  "/cases": {
    title: "Cases",
    subtitle: "Manage and track all your legal cases",
  },
  "/clients": {
    title: "Clients",
    subtitle: "Manage your client relationships",
  },
  "/documents": {
    title: "Documents",
    subtitle: "Manage case-related documents",
  },
  "/billing": { title: "Billing", subtitle: "Manage invoices and payments" },
  "/calendar": {
    title: "Calendar",
    subtitle: "Schedule and manage appointments",
  },
  "/settings": { title: "Settings", subtitle: "Configure your account" },
};
