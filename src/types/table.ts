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
