import { CaseColumnTable } from "@/types/case";

// Status and Practice Area
export const ALL_CASE_STATUS = "ALL_STATUS";
export const ALL_CASE_PRACTICE_AREAS = "ALL_PRACTICE_AREAS";

// Table
export const DEFAULT_PAGE = 0;
export const ROWS_PER_PAGE = 10;
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

export const COLUMNS: CaseColumnTable[] = [
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
    sortKey: "client",
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
