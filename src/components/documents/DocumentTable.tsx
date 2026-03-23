"use client";

import {
  Download as DownloadIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { DataTable } from "@/components/ui/table/DataTable";
import { AppChip } from "@/components/ui/chip/AppChip";
import {
  FILE_EXTENSION_CONFIG,
  DOCUMENT_COLUMNS,
} from "@/utils/constant/document";
import { Document, TableDocumentSortKey } from "@/types/document";
import { TableAction, TableSortOrder } from "@/types/table";
import { formatRelativeTimeFromNow } from "@/utils/date";
import { getDocumentTypeFromFilename } from "@/utils/helper/document";

export interface DocumentTableProps {
  data: Document[];
  caseNamesMap: Map<string, string>;
  sortKey: TableDocumentSortKey;
  sortOrder: TableSortOrder;
  onSort: (key: TableDocumentSortKey) => void;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onDownload?: (doc: Document) => void;
  onShare?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
  onView?: (doc: Document) => void;
  className?: string;
}

export function DocumentTable({
  data,
  caseNamesMap,
  sortKey,
  sortOrder,
  onSort,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onDownload,
  onShare,
  onDelete,
  className,
}: DocumentTableProps) {
  const actions: TableAction<Document>[] = [
    {
      icon: <DownloadIcon fontSize="small" />,
      label: "Download",
      onClick: (doc) => onDownload?.(doc),
      className: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    },
    {
      icon: <ShareIcon fontSize="small" />,
      label: "Share",
      onClick: (doc) => onShare?.(doc),
      className: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    },
    {
      icon: <DeleteIcon fontSize="small" />,
      label: "Delete",
      onClick: (doc) => onDelete?.(doc),
      className: "bg-red-100 hover:bg-red-200 text-red-600",
    },
  ];

  const customRenderers = {
    name: (row: Document) => {
      const fileExt = getDocumentTypeFromFilename(row.name);
      const Icon =
        FILE_EXTENSION_CONFIG[fileExt]?.styling?.icon ||
        FILE_EXTENSION_CONFIG.DEFAULT.styling?.icon;
      const iconBg =
        FILE_EXTENSION_CONFIG[fileExt]?.styling?.iconBg ||
        FILE_EXTENSION_CONFIG.DEFAULT.styling?.iconBg;
      return (
        <Box className="flex items-center gap-2">
          <Box className={`p-1.5 rounded-lg ${iconBg}`}>
            {Icon && <Icon className="text-white text-sm" />}
          </Box>
          <Box>
            <Typography className="text-sm font-medium">{row.name}</Typography>
            {row.description && (
              <Typography className="text-xs text-gray-500">
                {row.description}
              </Typography>
            )}
          </Box>
        </Box>
      );
    },
    caseId: (row: Document) => (
      <Typography>{caseNamesMap.get(row.caseId) || "—"}</Typography>
    ),
    type: (row: Document) => {
      const fileExt = getDocumentTypeFromFilename(row.name);
      const config =
        FILE_EXTENSION_CONFIG[fileExt] || FILE_EXTENSION_CONFIG.DEFAULT;
      return <AppChip config={config} selected={false} className="w-full" />;
    },
    size: (row: Document) => <Typography>{row.size}</Typography>,
    uploadDate: (row: Document) => (
      <Box className="flex items-center gap-1">
        <ScheduleIcon className="text-gray-400 text-sm" />
        <Typography variant="body2">
          {formatRelativeTimeFromNow(row.createdAt)}
        </Typography>
      </Box>
    ),
  };

  const tableColumns = DOCUMENT_COLUMNS.filter(
    (col) => col.field !== "actions",
  );

  return (
    <DataTable<Document, TableDocumentSortKey>
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
      emptyMessage="No documents found."
    />
  );
}
