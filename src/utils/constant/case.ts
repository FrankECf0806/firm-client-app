// Table columns configuration
export const CURRENT_PAGE = 0;
export const ROWS_PER_PAGE = 10;
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

export const COLUMNS = [
  { field: "id", label: "ID", minWidth: 80 },
  { field: "title", label: "Title", minWidth: 250 },
  { field: "client", label: "Client", minWidth: 180 },
  { field: "type", label: "Case Type", minWidth: 180 },
  { field: "openDate", label: "Open Date", minWidth: 140 },
  { field: "status", label: "Status", minWidth: 120 },
  { field: "actions", label: "Actions", minWidth: 120 },
];

// Calculate total width
export const TABLE_TOTAL_WIDTH = COLUMNS.reduce(
  (sum, col) => sum + col.minWidth,
  0,
);
