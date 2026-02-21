"use client";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { SortableHeader } from "@/components/table/SortableHeader";
import { TableProps, TableColumn } from "@/types/table";
import { ReactNode } from "react";
import { ROWS_PER_PAGE_OPTIONS } from "@/utils/constant/table";

export function DataTable<T extends object, K extends string>({
  // Data
  data,
  columns,
  actions = [],

  // Sorting
  sortKey,
  sortOrder,
  onSort,

  // Pagination
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,

  // Styling
  className = "",
  tableClassName = "",
  rowClassName = "",
  emptyMessage = "No data found.",

  // Row identifier
  rowKey,

  // Custom renderers
  customRenderers = {},
}: TableProps<T, K>) {
  const getRowKey = (row: T, index: number): string => {
    if (typeof rowKey === "function") {
      return rowKey(row);
    }
    // Safe access with type assertion
    const value = row[rowKey as keyof T];
    return value != null ? String(value) : String(index);
  };

  const getRowClassName = (row: T): string => {
    if (typeof rowClassName === "function") {
      return rowClassName(row);
    }
    return rowClassName;
  };

  const renderCell = (column: TableColumn<K>, row: T): ReactNode => {
    const field = column.field as K;

    // Use custom renderer if provided - pass the ENTIRE row
    if (customRenderers[field]) {
      return customRenderers[field]?.(row);
    }

    // Default rendering - safely access the field
    const value = (row as Record<string, unknown>)[field];

    // Handle null/undefined
    if (value === null || value === undefined) {
      return <Typography variant="body2">—</Typography>;
    }

    // Handle primitive types that React can render directly
    if (typeof value === "string") {
      return <Typography variant="body2">{value}</Typography>;
    }

    if (typeof value === "number") {
      return <Typography variant="body2">{value.toString()}</Typography>;
    }

    if (typeof value === "boolean") {
      return <Typography variant="body2">{value ? "Yes" : "No"}</Typography>;
    }

    // If it's an object or array, show a placeholder
    if (typeof value === "object") {
      return <Typography variant="body2">—</Typography>;
    }

    // Fallback
    return <Typography variant="body2">—</Typography>;
  };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  return (
    <Paper
      className={`p-2 mb-12 rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}
    >
      <TableContainer>
        <Table className={tableClassName}>
          <TableHead className="bg-gray-50">
            <TableRow className="bg-primary/25">
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  className="font-semibold text-gray-700 whitespace-nowrap"
                  style={{ minWidth: column.minWidth }}
                  align={column.align}
                >
                  {column.sortable && column.sortKey ? (
                    <SortableHeader
                      label={column.label}
                      sortKey={column.sortKey}
                      activeSortKey={sortKey}
                      sortOrder={sortOrder}
                      onSort={onSort}
                    />
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell
                  className="font-semibold text-gray-700 whitespace-nowrap"
                  align="center"
                  style={{ minWidth: 120 }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={getRowKey(row, index)}
                className={`hover:bg-primary/5 ${getRowClassName(row)}`}
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${getRowKey(row, index)}-${column.field}`}
                    className="whitespace-nowrap"
                    align={column.align}
                  >
                    {renderCell(column, row)}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell className="whitespace-nowrap" align="right">
                    <Box className="flex gap-1 align-middle justify-center">
                      {actions
                        .filter((action) => !action.show || action.show(row))
                        .map((action, actionIndex) => (
                          <Tooltip key={actionIndex} title={action.label}>
                            <IconButton
                              size="small"
                              className={
                                action.className ||
                                "bg-gray-100 hover:bg-gray-200 text-gray-600"
                              }
                              onClick={() => action.onClick(row)}
                              color={action.color}
                            >
                              {action.icon}
                            </IconButton>
                          </Tooltip>
                        ))}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="text-center py-8"
                >
                  <Typography variant="subtitle1" className="text-gray-600">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="border-t border-primary-light/50"
      />
    </Paper>
  );
}
