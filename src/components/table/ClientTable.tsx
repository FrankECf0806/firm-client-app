"use client";

import {
  Edit as EditIcon,
  Description as FileTextIcon,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import { DataTable } from "@/components/ui/table/DataTable";
import { AppChip } from "@/components/ui/chip/AppChip";
import {
  CLIENT_STATUS_CONFIG,
  CLIENT_TYPE_CONFIG,
  COLUMNS,
} from "@/utils/constant/client";
import { Client, TableClientSortKey } from "@/types/client";
import { TableAction, TableSortOrder } from "@/types/table";

export interface ClientTableProps {
  data: Client[];
  sortKey: TableClientSortKey;
  sortOrder: TableSortOrder;
  onSort: (key: TableClientSortKey) => void;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEditClient: (client: Client) => void;
  onViewNotes: (client: Client) => void;
  className?: string;
}

export function ClientTable({
  data,
  sortKey,
  sortOrder,
  onSort,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onEditClient,
  onViewNotes,
  className,
}: ClientTableProps) {
  const actions: TableAction<Client>[] = [
    {
      icon: <FileTextIcon fontSize="small" />,
      label: "View Notes",
      onClick: onViewNotes,
      className: "bg-primary/10 hover:bg-primary/20 text-primary",
    },
    {
      icon: <EditIcon fontSize="small" />,
      label: "Edit Client",
      onClick: onEditClient,
      className: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    },
  ];

  const customRenderers = {
    id: (row: Client) => (
      <Typography className="font-mono text-gray-600">#{row.id}</Typography>
    ),
    name: (row: Client) => (
      <>
        <Link href={`/clients/${row.id}`}>
          <Typography className="font-medium text-primary hover:underline">
            {row.firstName} {row.lastName}
          </Typography>
        </Link>
        {row.company && (
          <Typography
            variant="caption"
            display="block"
            className="text-gray-500"
          >
            {row.company}
          </Typography>
        )}
      </>
    ),
    type: (row: Client) => (
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 10 }}>
          <AppChip
            config={CLIENT_TYPE_CONFIG[row.type]}
            selected={false}
            className="w-full"
          />
        </Grid>
      </Grid>
    ),
    status: (row: Client) => (
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 10 }}>
          <AppChip
            config={CLIENT_STATUS_CONFIG[row.status]}
            selected={true}
            className="w-full"
          />
        </Grid>
      </Grid>
    ),
    email: (row: Client) => (
      <Typography variant="body2">{row.email}</Typography>
    ),
    phone: (row: Client) => (
      <Typography variant="body2">{row.phone}</Typography>
    ),
    address: (row: Client) => (
      <Typography variant="body2">{row.address}</Typography>
    ),
  };

  // Filter out the actions column since we handle it separately
  const tableColumns = COLUMNS.filter((col) => col.field !== "actions");

  return (
    <DataTable<Client, TableClientSortKey>
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
      emptyMessage="No clients found."
    />
  );
}
