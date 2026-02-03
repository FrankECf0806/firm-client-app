import { CaseStatus, PracticeArea } from "@/enums/case";
import { PageItem } from "@/types/layout";
import { QuickFilterItem } from "@/types/ui";
import { QuickFilterStatus } from "@/types/case";

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
 * Case Type
 * */
export const CASE_TYPE_CONFIG: Record<
  PracticeArea,
  QuickFilterItem<PracticeArea>
> = {
  [PracticeArea.CIVIL_LITIGATION]: {
    label: PracticeArea.CIVIL_LITIGATION,
    styling: {
      selectedClass: "bg-blue-600 text-white",
      unselectedClass: "bg-blue-50 text-blue-700 border border-blue-200",
    },
    onClick: (setType) => setType(PracticeArea.CIVIL_LITIGATION),
  },
  [PracticeArea.ESTATE_PLANNING]: {
    label: PracticeArea.ESTATE_PLANNING,
    styling: {},
    onClick: (setType) => setType(PracticeArea.ESTATE_PLANNING),
  },
  [PracticeArea.CORPORATE]: {
    label: PracticeArea.CORPORATE,
    styling: {
      selectedClass: "bg-indigo-600 text-white",
      unselectedClass: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    },
    onClick: (setType) => setType(PracticeArea.CORPORATE),
  },
  [PracticeArea.FAMILY_LAW]: {
    label: PracticeArea.FAMILY_LAW,
    styling: {},
    onClick: (setType) => setType(PracticeArea.FAMILY_LAW),
  },
  [PracticeArea.INMIGRATION]: {
    label: PracticeArea.INMIGRATION,
    styling: {},
    onClick: (setType) => setType(PracticeArea.INMIGRATION),
  },
  [PracticeArea.REAL_ESTATE]: {
    label: PracticeArea.REAL_ESTATE,
    styling: {},
    onClick: (setType) => setType(PracticeArea.REAL_ESTATE),
  },
  [PracticeArea.CRIMINAL_DEFENSE]: {
    label: PracticeArea.CRIMINAL_DEFENSE,
    styling: {},
    onClick: (setType) => setType(PracticeArea.CRIMINAL_DEFENSE),
  },
  [PracticeArea.INTELLECTUAL_PROPERTY]: {
    label: PracticeArea.INTELLECTUAL_PROPERTY,
    styling: {},
    onClick: (setType) => setType(PracticeArea.INTELLECTUAL_PROPERTY),
  },
};

export const QUICK_FILTER_CASE_TYPE_KEYS: PracticeArea[] = [
  PracticeArea.CIVIL_LITIGATION,
  PracticeArea.CORPORATE,
] as const;

export const QUICK_FILTER_CASE_TYPE = Object.entries(CASE_TYPE_CONFIG).filter(
  ([key]) => QUICK_FILTER_CASE_TYPE_KEYS.includes(key as PracticeArea),
);

/**
 * Case Status
 * */
export const CASE_STATUS_CONFIG: Record<
  QuickFilterStatus,
  QuickFilterItem<QuickFilterStatus>
> = {
  ["ALL_STATUS"]: {
    label: "All Status",
    styling: {
      color: "primary",
    },
    onClick: (setStatus) => setStatus("ALL_STATUS"),
  },

  [CaseStatus.ACTIVE]: {
    label: CaseStatus.ACTIVE,
    styling: {
      color: "success",
    },
    onClick: (setStatus) => setStatus(CaseStatus.ACTIVE),
  },

  [CaseStatus.PENDING]: {
    label: CaseStatus.PENDING,
    styling: {
      color: "warning",
    },
    onClick: (setStatus) => setStatus(CaseStatus.PENDING),
  },
  [CaseStatus.CLOSED]: {
    label: CaseStatus.CLOSED,
    styling: {
      color: "error",
    },
    onClick: (setStatus) => setStatus(CaseStatus.CLOSED),
  },
  [CaseStatus.ARCHIVED]: {
    label: CaseStatus.ARCHIVED,
    styling: {
      color: "info",
    },
    onClick: (setStatus) => setStatus(CaseStatus.ARCHIVED),
  },
};

export const QUICK_FILTER_CASE_STATUS_KEYS: QuickFilterStatus[] = [
  "ALL_STATUS",
  CaseStatus.ACTIVE,
  CaseStatus.PENDING,
] as const;

export const QUICK_FILTER_CASE_STATUS = Object.entries(
  CASE_STATUS_CONFIG,
).filter(([key]) =>
  QUICK_FILTER_CASE_STATUS_KEYS.includes(key as QuickFilterStatus),
);
