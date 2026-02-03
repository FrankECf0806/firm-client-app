import { SortOrder } from "@/types/case";

export interface SortableHeaderProps<T extends string> {
  label: string;
  sortKey: T;
  activeSortKey: T;
  sortOrder: SortOrder;
  onSort: (key: T) => void;
}
