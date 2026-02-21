import { ReactNode } from "react";

export type TableColumnAlign = "left" | "right" | "center";
export type TableSortOrder = "asc" | "desc";

export interface TableColumn<T extends string> {
  field: string;
  label: string;
  minWidth?: number;
  sortable?: boolean;
  sortKey?: T;
  align?: TableColumnAlign;
}

export interface SortableHeaderProps<T extends string> {
  label: string;
  sortKey: T;
  activeSortKey: T;
  sortOrder: TableSortOrder;
  onSort: (key: T) => void;
}

export interface TableAction<T extends object> {
  icon: ReactNode;
  label: string;
  onClick: (row: T) => void;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  className?: string;
  show?: (row: T) => boolean;
}

export interface TableProps<T extends object, K extends string> {
  // Data
  data: T[];
  columns: TableColumn<K>[];
  actions?: TableAction<T>[];

  // Sorting
  sortKey: K;
  sortOrder: TableSortOrder;
  onSort: (key: K) => void;

  // Pagination
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;

  // Styling
  className?: string;
  tableClassName?: string;
  rowClassName?: string | ((row: T) => string);
  emptyMessage?: string;

  // Row identifier
  rowKey: keyof T | ((row: T) => string);

  // Custom renderers
  customRenderers?: Partial<Record<K, (row: T) => ReactNode>>;
}
