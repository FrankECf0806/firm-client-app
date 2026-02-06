import { FilterItem } from "@/types/ui";
import { TableColumn } from "./table";
import {
  ClientFilterStatus,
  ClientFilterType,
  TableClientSortKey,
} from "@/types/client";
import { ClientStatus } from "@/enums/client";

/** Status and Client Type */
export const ALL_CLIENT_STATUS = "ALL_STATUS";
export const ALL_CLIENT_TYPES = "ALL_CLIENT_TYPES";

/** Client Table Columns */
export const COLUMNS: TableColumn<TableClientSortKey>[] = [
  { field: "id", label: "ID", minWidth: 80, sortable: true, sortKey: "id" },
  {
    field: "name",
    label: "Name",
    minWidth: 250,
    sortable: true,
    sortKey: "name",
  },
  {
    field: "email",
    label: "Email",
    minWidth: 180,
    sortable: true,
    sortKey: "email",
  },
  {
    field: "phone",
    label: "Phone",
    minWidth: 180,
    sortable: true,
    sortKey: "phone",
  },
  {
    field: "type",
    label: "Type",
    minWidth: 180,
    sortable: true,
    sortKey: "type",
  },
  {
    field: "address",
    label: "Address",
    minWidth: 150,
    sortable: true,
    sortKey: "address",
  },
  {
    field: "status",
    label: "Status",
    minWidth: 150,
    sortable: true,
    sortKey: "status",
  },
  { field: "actions", label: "Actions", minWidth: 120, align: "right" },
];

export const TABLE_TOTAL_WIDTH = COLUMNS.reduce(
  (sum, col) => sum + (col.minWidth ?? 0),
  0,
);

/** Client Status* */
export const CLIENT_STATUS_CONFIG: Record<
  ClientFilterStatus,
  FilterItem<ClientFilterStatus>
> = {
  [ALL_CLIENT_STATUS]: {
    label: "All Status",
    styling: {
      color: "primary",
    },
    onClick: (setStatus) => setStatus(ALL_CLIENT_STATUS),
  },

  ["ACTIVE"]: {
    label: ClientStatus.ACTIVE,
    styling: {
      color: "success",
    },
    onClick: (setStatus) => setStatus("ACTIVE"),
  },

  ["INACTIVE"]: {
    label: ClientStatus.INACTIVE,
    styling: {
      color: "warning",
    },
    onClick: (setStatus) => setStatus("INACTIVE"),
  },
  ["PROSPECT"]: {
    label: ClientStatus.PROSPECT,
    styling: {
      color: "error",
    },
    onClick: (setStatus) => setStatus("PROSPECT"),
  },
};

export const QUICK_FILTER_CLIENT_STATUS_KEYS: ClientFilterStatus[] = [
  ALL_CLIENT_STATUS,
  "ACTIVE",
] as const;

export const QUICK_FILTER_CLIENT_STATUS = Object.entries(
  CLIENT_STATUS_CONFIG,
).filter(([key]) =>
  QUICK_FILTER_CLIENT_STATUS_KEYS.includes(key as ClientFilterStatus),
);

//** Client Type */
export const CLIENT_TYPE_CONFIG: Record<
  ClientFilterType,
  FilterItem<ClientFilterType>
> = {
  [ALL_CLIENT_TYPES]: {
    label: "All Types",
    styling: {
      selectedClass: "bg-blue-600 text-white",
      unselectedClass:
        "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:text-white",
    },
    onClick: (setType) => setType(ALL_CLIENT_TYPES),
  },
  ["INDIVIDUAL"]: {
    label: "Individual",
    styling: {
      selectedClass: "bg-emerald-600 text-white",
      unselectedClass:
        "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100",
    },
    onClick: (setType) => setType("INDIVIDUAL"),
  },
  ["CORPORATE"]: {
    label: "Corporate",
    styling: {
      selectedClass: "bg-indigo-600 text-white",
      unselectedClass:
        "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100",
    },
    onClick: (setType) => setType("CORPORATE"),
  },
  ["GOVERNMENT"]: {
    label: "Government",
    styling: {
      selectedClass: "bg-purple-600 text-white",
      unselectedClass:
        "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100",
    },
    onClick: (setType) => setType("GOVERNMENT"),
  },
  ["NON_PROFIT"]: {
    label: "Non-Profit",
    styling: {
      selectedClass: "bg-amber-600 text-white",
      unselectedClass:
        "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100",
    },
    onClick: (setType) => setType("NON_PROFIT"),
  },
};

export const QUICK_FILTER_CLIENT_TYPE_KEYS: ClientFilterType[] = [
  ALL_CLIENT_TYPES,
  "INDIVIDUAL",
  "CORPORATE",
] as const;

export const QUICK_FILTER_CLIENT_TYPE = Object.entries(
  CLIENT_TYPE_CONFIG,
).filter(([key]) =>
  QUICK_FILTER_CLIENT_TYPE_KEYS.includes(key as ClientFilterType),
);
