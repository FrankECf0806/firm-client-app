import {
  CaseFilterPracticeArea,
  CaseFilterStatus,
  TableCaseSortKey,
} from "@/types/case";
import { ConfigItem } from "@/types/ui";
import { CasePracticeArea, CaseStatus } from "@/enums/case";
import { TableColumn } from "@/types/table";

// Status and Practice Area
export const ALL_CASE_STATUS = "ALL_STATUS";
export const ALL_CASE_PRACTICE_AREAS = "ALL_PRACTICE_AREAS";

export const COLUMNS: TableColumn<TableCaseSortKey>[] = [
  { field: "id", label: "ID", minWidth: 80, sortable: true, sortKey: "id" },
  {
    field: "title",
    label: "Title",
    minWidth: 250,
    sortable: true,
    sortKey: "title",
  },
  {
    field: "client",
    label: "Client",
    minWidth: 180,
    sortable: true,
    sortKey: "clientId",
  },
  {
    field: "practiceArea",
    label: "Practice Area",
    minWidth: 180,
    sortable: true,
    sortKey: "practiceArea",
  },
  {
    field: "openedAt",
    label: "Open Date",
    minWidth: 140,
    sortable: true,
    sortKey: "openedAt",
  },
  {
    field: "status",
    label: "Status",
    minWidth: 120,
    sortable: true,
    sortKey: "status",
  },
  { field: "actions", label: "Actions", minWidth: 120, align: "right" },
];

export const TABLE_TOTAL_WIDTH = COLUMNS.reduce(
  (sum, col) => sum + (col.minWidth ?? 0),
  0,
);

/**
 * Practice Area
 * */
export const CASE_TYPE_CONFIG: Record<
  CaseFilterPracticeArea,
  ConfigItem<CaseFilterPracticeArea>
> = {
  ["CIVIL_LITIGATION"]: {
    label: CasePracticeArea.CIVIL_LITIGATION,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-200",
      unselectedClass:
        "bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100 hover:border-blue-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("CIVIL_LITIGATION"),
  },
  ["ESTATE_PLANNING"]: {
    label: CasePracticeArea.ESTATE_PLANNING,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-200",
      unselectedClass:
        "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("ESTATE_PLANNING"),
  },
  ["CORPORATE"]: {
    label: CasePracticeArea.CORPORATE,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-200",
      unselectedClass:
        "bg-indigo-50 text-indigo-700 border border-indigo-300 hover:bg-indigo-100 hover:border-indigo-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("CORPORATE"),
  },
  ["FAMILY_LAW"]: {
    label: CasePracticeArea.FAMILY_LAW,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-md shadow-pink-200",
      unselectedClass:
        "bg-pink-50 text-pink-700 border border-pink-300 hover:bg-pink-100 hover:border-pink-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("FAMILY_LAW"),
  },
  ["IMMIGRATION"]: {
    label: CasePracticeArea.IMMIGRATION,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-200",
      unselectedClass:
        "bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 hover:border-amber-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("IMMIGRATION"),
  },
  ["REAL_ESTATE"]: {
    label: CasePracticeArea.REAL_ESTATE,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md shadow-teal-200",
      unselectedClass:
        "bg-teal-50 text-teal-700 border border-teal-300 hover:bg-teal-100 hover:border-teal-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("REAL_ESTATE"),
  },
  ["CRIMINAL_DEFENSE"]: {
    label: CasePracticeArea.CRIMINAL_DEFENSE,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-200",
      unselectedClass:
        "bg-red-50 text-red-700 border border-red-300 hover:bg-red-100 hover:border-red-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("CRIMINAL_DEFENSE"),
  },
  ["INTELLECTUAL_PROPERTY"]: {
    label: CasePracticeArea.INTELLECTUAL_PROPERTY,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-200",
      unselectedClass:
        "bg-purple-50 text-purple-700 border border-purple-300 hover:bg-purple-100 hover:border-purple-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("INTELLECTUAL_PROPERTY"),
  },
  ["GOVERNMENT"]: {
    label: CasePracticeArea.GOVERNMENT,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-md shadow-slate-200",
      unselectedClass:
        "bg-slate-50 text-slate-700 border border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("GOVERNMENT"),
  },
  ["EMPLOYMENT"]: {
    label: CasePracticeArea.EMPLOYMENT,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-md shadow-cyan-200",
      unselectedClass:
        "bg-cyan-50 text-cyan-700 border border-cyan-300 hover:bg-cyan-100 hover:border-cyan-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("EMPLOYMENT"),
  },
  ["PERSONAL_INJURY"]: {
    label: CasePracticeArea.PERSONAL_INJURY,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-md shadow-orange-200",
      unselectedClass:
        "bg-orange-50 text-orange-700 border border-orange-300 hover:bg-orange-100 hover:border-orange-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("PERSONAL_INJURY"),
  },
  ["NON_PROFIT"]: {
    label: CasePracticeArea.NON_PROFIT,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-lime-600 to-lime-700 text-white shadow-md shadow-lime-200",
      unselectedClass:
        "bg-lime-50 text-lime-700 border border-lime-300 hover:bg-lime-100 hover:border-lime-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("NON_PROFIT"),
  },
  ["ENVIRONMENTAL"]: {
    label: CasePracticeArea.ENVIRONMENTAL,
    styling: {
      selectedClass:
        "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md shadow-green-200",
      unselectedClass:
        "bg-green-50 text-green-700 border border-green-300 hover:bg-green-100 hover:border-green-400 hover:shadow-sm transition-all duration-200",
    },
    onClick: (setType) => setType("ENVIRONMENTAL"),
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
  ConfigItem<CaseFilterStatus>
> = {
  [ALL_CASE_STATUS]: {
    label: "All Status",
    styling: {
      color: "primary",
    },
    onClick: (setStatus) => setStatus(ALL_CASE_STATUS),
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
  ALL_CASE_STATUS,
  "ACTIVE",
  "PENDING",
] as const;

export const QUICK_FILTER_CASE_STATUS = Object.entries(
  CASE_STATUS_CONFIG,
).filter(([key]) =>
  QUICK_FILTER_CASE_STATUS_KEYS.includes(key as CaseFilterStatus),
);
