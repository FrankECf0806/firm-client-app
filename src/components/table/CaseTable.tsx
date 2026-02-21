"use client";

import {
  Edit as EditIcon,
  Description as FileTextIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { DataTable } from "@/components/ui/table/DataTable";
import { AppChip } from "@/components/ui/chip/AppChip";
import {
  CASE_STATUS_CONFIG,
  CASE_TYPE_CONFIG,
  COLUMNS,
} from "@/utils/constant/case";
import { Case, TableCaseSortKey } from "@/types/case";
import { TableAction, TableSortOrder } from "@/types/table";

export interface CaseTableProps {
  data: Case[];
  clientNamesMap: Map<string, string>;
  sortKey: TableCaseSortKey;
  sortOrder: TableSortOrder;
  onSort: (key: TableCaseSortKey) => void;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEditCase: (caseItem: Case) => void;
  onViewNotes: (caseItem: Case) => void;
  className?: string;
}

export function CaseTable({
  data,
  clientNamesMap,
  sortKey,
  sortOrder,
  onSort,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onEditCase,
  onViewNotes,
  className,
}: CaseTableProps) {
  const actions: TableAction<Case>[] = [
    {
      icon: <FileTextIcon fontSize="small" />,
      label: "View Notes",
      onClick: onViewNotes,
      className: "bg-primary/10 hover:bg-primary/20 text-primary",
    },
    {
      icon: <EditIcon fontSize="small" />,
      label: "Edit Case",
      onClick: onEditCase,
      className: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    },
  ];

  const customRenderers = {
    id: (row: Case) => (
      <Typography className="font-mono text-gray-600">#{row.id}</Typography>
    ),
    client: (row: Case) => (
      <Typography>{clientNamesMap.get(row.clientId)}</Typography>
    ),
    title: (row: Case) => (
      <Typography className="font-medium">{row.title}</Typography>
    ),
    practiceArea: (row: Case) => (
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 10 }}>
          <AppChip
            config={CASE_TYPE_CONFIG[row.practiceArea]}
            selected={false}
            className="w-full"
          />
        </Grid>
      </Grid>
    ),
    status: (row: Case) => (
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 10 }}>
          <AppChip
            config={CASE_STATUS_CONFIG[row.status]}
            selected={true}
            className="w-full"
          />
        </Grid>
      </Grid>
    ),
    openedAt: (row: Case) => (
      <Box className="flex items-center gap-1">
        <ScheduleIcon className="text-gray-400 text-sm" />
        <Typography variant="body2">{row.openedAt}</Typography>
      </Box>
    ),
  };

  // Filter out the actions column since we handle it separately
  const tableColumns = COLUMNS.filter((col) => col.field !== "actions");

  return (
    <DataTable<Case, TableCaseSortKey>
      data={data}
      columns={tableColumns}
      actions={actions}
      sortKey={sortKey}
      sortOrder={sortOrder}
      onSort={onSort}
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={totalCount}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      rowKey="id"
      customRenderers={customRenderers}
      className={className}
      emptyMessage="No cases found matching your criteria."
    />
  );
}
