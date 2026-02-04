import { CaseStatus, CasePracticeArea } from "@/enums/case";
import { PageItem } from "@/types/layout";
import { FilterItem } from "@/types/ui";
import { CaseFilterPracticeArea, CaseFilterStatus } from "@/types/case";

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

/**
 * Practice Area
 * */
export const CASE_TYPE_CONFIG: Record<
  CaseFilterPracticeArea,
  FilterItem<CaseFilterPracticeArea>
> = {
  ["CIVIL_LITIGATION"]: {
    label: CasePracticeArea.CIVIL_LITIGATION,
    styling: {
      selectedClass: "bg-blue-600 text-white",
      unselectedClass:
        "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:text-white",
    },
    onClick: (setType) => setType("CIVIL_LITIGATION"),
  },
  ["ESTATE_PLANNING"]: {
    label: CasePracticeArea.ESTATE_PLANNING,
    styling: {
      selectedClass: "bg-emerald-600 text-white",
      unselectedClass:
        "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100",
    },
    onClick: (setType) => setType("ESTATE_PLANNING"),
  },
  ["CORPORATE"]: {
    label: CasePracticeArea.CORPORATE,
    styling: {
      selectedClass: "bg-indigo-600 text-white",
      unselectedClass:
        "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100",
    },
    onClick: (setType) => setType("CORPORATE"),
  },
  ["FAMILY_LAW"]: {
    label: CasePracticeArea.FAMILY_LAW,
    styling: {
      selectedClass: "bg-pink-600 text-white",
      unselectedClass:
        "bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100",
    },
    onClick: (setType) => setType("FAMILY_LAW"),
  },
  ["INMIGRATION"]: {
    label: CasePracticeArea.INMIGRATION,
    styling: {
      selectedClass: "bg-amber-600 text-white",
      unselectedClass:
        "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100",
    },
    onClick: (setType) => setType("INMIGRATION"),
  },
  ["REAL_ESTATE"]: {
    label: CasePracticeArea.REAL_ESTATE,
    styling: {
      selectedClass: "bg-teal-600 text-white",
      unselectedClass:
        "bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100",
    },
    onClick: (setType) => setType("REAL_ESTATE"),
  },
  ["CRIMINAL_DEFENSE"]: {
    label: CasePracticeArea.CRIMINAL_DEFENSE,
    styling: {
      selectedClass: "bg-red-600 text-white",
      unselectedClass:
        "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
    },
    onClick: (setType) => setType("CRIMINAL_DEFENSE"),
  },
  ["INTELLECTUAL_PROPERTY"]: {
    label: CasePracticeArea.INTELLECTUAL_PROPERTY,
    styling: {
      selectedClass: "bg-purple-600 text-white",
      unselectedClass:
        "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100",
    },
    onClick: (setType) => setType("INTELLECTUAL_PROPERTY"),
  },
};

export const QUICK_FILTER_CASE_TYPE_KEYS: CaseFilterPracticeArea[] = [
  "CIVIL_LITIGATION",
  "CORPORATE",
] as const;

export const QUICK_FILTER_CASE_TYPE = Object.entries(CASE_TYPE_CONFIG).filter(
  ([key]) =>
    QUICK_FILTER_CASE_TYPE_KEYS.includes(key as CaseFilterPracticeArea),
);

/**
 * Case Status
 * */
export const CASE_STATUS_CONFIG: Record<
  CaseFilterStatus,
  FilterItem<CaseFilterStatus>
> = {
  ["ALL_STATUS"]: {
    label: "All Status",
    styling: {
      color: "primary",
    },
    onClick: (setStatus) => setStatus("ALL_STATUS"),
  },

  ["ACTIVE"]: {
    label: CaseStatus.ACTIVE,
    styling: {
      color: "success",
    },
    onClick: (setStatus) => setStatus("ACTIVE"),
  },

  ["PENDING"]: {
    label: CaseStatus.PENDING,
    styling: {
      color: "warning",
    },
    onClick: (setStatus) => setStatus("PENDING"),
  },
  ["CLOSED"]: {
    label: CaseStatus.CLOSED,
    styling: {
      color: "error",
    },
    onClick: (setStatus) => setStatus("CLOSED"),
  },
  ["ARCHIVED"]: {
    label: CaseStatus.ARCHIVED,
    styling: {
      color: "info",
    },
    onClick: (setStatus) => setStatus("ARCHIVED"),
  },
};

export const QUICK_FILTER_CASE_STATUS_KEYS: CaseFilterStatus[] = [
  "ALL_STATUS",
  "ACTIVE",
  "PENDING",
] as const;

export const QUICK_FILTER_CASE_STATUS = Object.entries(
  CASE_STATUS_CONFIG,
).filter(([key]) =>
  QUICK_FILTER_CASE_STATUS_KEYS.includes(key as CaseFilterStatus),
);
