// Table columns configuration
export const CURRENT_PAGE = 0;
export const ROWS_PER_PAGE = 10;
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

export const COLUMNS = [
  { field: "id", label: "ID", width: 80 },
  { field: "title", label: "Title", width: 250 },
  { field: "client", label: "Client", width: 180 },
  { field: "type", label: "Case Type", width: 180 },
  { field: "openDate", label: "Open Date", width: 140 },
  { field: "status", label: "Status", width: 120 },
  { field: "actions", label: "Actions", width: 120 },
];

// Calculate total width
export const TABLE_TOTAL_WIDTH = COLUMNS.reduce(
  (sum, col) => sum + col.width,
  0,
);
