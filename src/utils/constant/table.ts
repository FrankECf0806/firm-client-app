// Table

// Table
export const DEFAULT_PAGE = 0;
export const ROWS_PER_PAGE = 10;
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

export interface TableColumn<T extends string> {
  field: string;
  label: string;
  minWidth?: number;
  sortable?: boolean;
  sortKey?: T;
  align?: "left" | "right" | "center";
}

export type SortOrder = "asc" | "desc";
