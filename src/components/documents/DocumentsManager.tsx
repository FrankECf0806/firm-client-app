"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  Upload as UploadIcon,
  ViewModule as GridIcon,
  ViewList as ListIcon,
} from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useAppContext } from "@/providers/AppProvider";
import { SearchInput } from "@/components/ui/input/SearchInput";
import { ResettableSelect } from "@/components/ui/input/ResettableSelect";
import { QuickFilterChips } from "@/components/ui/chip/QuickFilterChips";
import { DocumentCard } from "./DocumentCard";
import { DocumentTable } from "./DocumentTable";
import { DEFAULT_PAGE, ROWS_PER_PAGE } from "@/utils/constant/table";
import {
  ALL_DOCUMENT_TYPES,
  QUICK_FILTER_DOCUMENTS,
  GROUP_TO_EXTENSIONS,
  ALL_CASES_BY_CLIENT,
} from "@/utils/constant/document";
import {
  Document,
  DocumentFormValues,
  TableDocumentSortKey,
} from "@/types/document";
import { TableSortOrder } from "@/types/table";
import { ViewManagerProps } from "@/types/shared";
import { ViewMode } from "@/types/ui";
import { FileExtensionGroup } from "@/enums/document";
import { UploadFileForm } from "@/components/forms/UploadFileForm";
import { FormState } from "@/types/form";
import { getDocumentTypeFromFilename } from "@/utils/helper/document";

export function DocumentsManager({
  clientId,
  searchPlaceholder = "Search documents...",
}: ViewManagerProps) {
  const params = useParams();
  const effectiveClientId = clientId || (params?.clientId as string);

  const { documents, cases } = useAppContext();
  const { documents: documentsList, deleteDocument } = documents;
  const { cases: casesList } = cases;

  // Pre‑filter documents by clientId
  const filteredDocumentsByClient = useMemo(() => {
    if (!effectiveClientId) return documentsList;
    return documentsList.filter((doc) => doc.clientId === effectiveClientId);
  }, [documentsList, effectiveClientId]);

  const clientCases = useMemo(() => {
    if (!effectiveClientId) return casesList;
    return casesList.filter((c) => c.clientId === effectiveClientId);
  }, [casesList, effectiveClientId]);

  // Map case IDs to titles for display
  const caseNamesMap = useMemo(() => {
    const map = new Map<string, string>();
    casesList.forEach((c) => map.set(c.id, c.title));
    return map;
  }, [casesList]);

  const caseOptions = useMemo(() => {
    const options: Record<string, string> = {};
    clientCases.forEach((c) => {
      options[c.id] = c.title;
    });
    return options;
  }, [clientCases]);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>(ALL_DOCUMENT_TYPES);
  const [caseFilter, setCaseFilter] = useState<string>("ALL_CASES");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [sortKey, setSortKey] = useState<TableDocumentSortKey>("createdAt");
  const [sortOrder, setSortOrder] = useState<TableSortOrder>("desc");

  const [documentFormState, setDocumentFormState] = useState<
    FormState<DocumentFormValues>
  >({
    open: false,
    mode: "create",
  });

  // Handle upload button click
  const handleUpload = () => {
    if (effectiveClientId) {
      setDocumentFormState({
        open: true,
        mode: "create",
        formData: { clientId: effectiveClientId },
      });
    } else {
      setDocumentFormState({
        open: true,
        mode: "create",
      });
    }
  };

  // Filter and sort documents
  const filteredAndSortedDocuments = useMemo(() => {
    if (!filteredDocumentsByClient.length) return [];

    const trimmedQuery = searchQuery.trim();
    const hasSearch = trimmedQuery.length > 0;
    const hasTypeFilter = typeFilter !== ALL_DOCUMENT_TYPES;
    const hasCaseFilter = caseFilter !== "ALL_CASES";

    const q = hasSearch ? trimmedQuery.toLowerCase() : "";

    const filtered = filteredDocumentsByClient.filter((doc) => {
      if (hasSearch) {
        const matchesSearch =
          doc.name.toLowerCase().includes(q) ||
          (doc.description && doc.description.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      if (hasTypeFilter) {
        const extensions = GROUP_TO_EXTENSIONS[typeFilter];
        if (extensions) {
          const ext = getDocumentTypeFromFilename(doc.name);
          if (!extensions.includes(ext)) return false;
        }
      }

      if (hasCaseFilter && doc.caseId !== caseFilter) return false;

      return true;
    });

    if (!sortKey || filtered.length <= 1) return filtered;

    const result = [...filtered];
    const direction = sortOrder === "asc" ? 1 : -1;

    result.sort((a, b) => {
      if (sortKey === "name") {
        return a.name.localeCompare(b.name) * direction;
      }
      if (sortKey === "size") {
        const getBytes = (size: string) => {
          const [num, unit] = size.split(" ");
          const bytes = parseFloat(num);
          if (unit === "KB") return bytes * 1024;
          if (unit === "MB") return bytes * 1024 * 1024;
          return bytes;
        };
        return (getBytes(a.size) - getBytes(b.size)) * direction;
      }
      if (sortKey === "createdAt") {
        return (
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          direction
        );
      }
      if (sortKey === "caseId") {
        const nameA = caseNamesMap.get(a.caseId) || "";
        const nameB = caseNamesMap.get(b.caseId) || "";
        return nameA.localeCompare(nameB) * direction;
      }
      if (sortKey === "fileExt") {
        const extA = getDocumentTypeFromFilename(a.name);
        const extB = getDocumentTypeFromFilename(b.name);
        return extA.localeCompare(extB) * direction;
      }
      return 0;
    });

    return result;
  }, [
    filteredDocumentsByClient,
    searchQuery,
    typeFilter,
    caseFilter,
    sortKey,
    sortOrder,
    caseNamesMap,
  ]);

  const paginatedDocuments = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredAndSortedDocuments.slice(start, start + rowsPerPage);
  }, [filteredAndSortedDocuments, page, rowsPerPage]);

  const handleSort = (key: TableDocumentSortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleDownload = (doc: Document) => console.log("Download", doc);
  const handleShare = (doc: Document) => console.log("Share", doc);
  const handleDelete = (doc: Document) => {
    deleteDocument(doc.id);
  };
  const handleView = (doc: Document) => console.log("View", doc);

  return (
    <Box>
      <Paper className="p-4 mb-6 rounded-xl border border-gray-200 shadow-sm">
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 5, lg: 5 }}>
            <SearchInput
              className="input-rounded-firm w-full"
              size="medium"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 7, lg: 7 }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
            >
              {/* Filter Icon */}
              <Grid size="auto" className="hidden lg:block">
                <Box className="flex items-end justify-center h-full pr-1">
                  <FilterIcon className="text-gray-400" />
                </Box>
              </Grid>

              {/* Case Filter */}
              <Grid size={{ xs: 6, sm: 3, md: 3, lg: 3 }}>
                <ResettableSelect
                  className="input-rounded-firm w-full"
                  label="Case"
                  value={caseFilter}
                  onChange={setCaseFilter}
                  options={caseOptions}
                  resetValue={ALL_CASES_BY_CLIENT}
                  resetLabel="All Cases"
                />
              </Grid>

              {/* Document Type Filter */}
              <Grid size={{ xs: 6, sm: 3, md: 3, lg: 3 }}>
                <ResettableSelect
                  className="input-rounded-firm w-full"
                  label="Document Type"
                  value={typeFilter}
                  onChange={setTypeFilter}
                  options={FileExtensionGroup}
                  resetValue={ALL_DOCUMENT_TYPES}
                  resetLabel="All Types"
                />
              </Grid>

              {/* View Toggle */}
              <Grid size={{ xs: 12, sm: 3, md: 3, lg: 2 }}>
                <ToggleButtonGroup
                  value={viewMode}
                  onChange={(_, value) => value && setViewMode(value)}
                  className="input-rounded-firm"
                  size="small"
                  color="primary"
                  exclusive
                  fullWidth
                >
                  <ToggleButton value="grid" className="flex-1">
                    <GridIcon className="text-sm mr-1" /> Grid
                  </ToggleButton>
                  <ToggleButton value="table" className="flex-1">
                    <ListIcon className="text-sm mr-1" /> List
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              <Grid size={{ xs: 12, sm: 3, md: 3, lg: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<UploadIcon />}
                  className="button-firm bg-primary hover:bg-primary-dark shadow-sm w-full whitespace-nowrap"
                  onClick={handleUpload}
                >
                  <Box className="hidden sm:inline">Upload</Box>
                  <Box className="sm:hidden">Upload</Box>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box className="mt-4">
          <QuickFilterChips
            title="Quick Filter"
            items={QUICK_FILTER_DOCUMENTS}
            value={typeFilter}
            onChange={setTypeFilter}
          />
        </Box>
      </Paper>

      {viewMode === "grid" ? (
        <Grid container spacing={2} className="mb-12">
          {filteredAndSortedDocuments.map((doc) => (
            <Grid key={doc.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <DocumentCard
                document={doc}
                caseName={caseNamesMap.get(doc.caseId)}
                onDownload={handleDownload}
                onShare={handleShare}
                onDelete={handleDelete}
                onClick={handleView}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <DocumentTable
          data={paginatedDocuments}
          caseNamesMap={caseNamesMap}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={handleSort}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={filteredAndSortedDocuments.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onDownload={handleDownload}
          onShare={handleShare}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      <UploadFileForm
        {...documentFormState}
        onClose={() =>
          setDocumentFormState((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </Box>
  );
}
