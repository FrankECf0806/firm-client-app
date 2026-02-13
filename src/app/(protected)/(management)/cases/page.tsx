"use client";

import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Description as FileTextIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { useMemo, useState, MouseEvent, ChangeEvent, useEffect } from "react";
import { CaseStatus, CasePracticeArea } from "@/enums/case";
import {
  CASE_STATUS_CONFIG,
  CASE_TYPE_CONFIG,
  QUICK_FILTER_CASE_STATUS,
  QUICK_FILTER_CASE_TYPE,
} from "@/utils/constant/case";
import {
  ALL_CASE_STATUS,
  ALL_CASE_PRACTICE_AREAS,
} from "@/utils/constant/case";
import { CaseForm } from "@/components/forms/CaseForm";
import { SortableHeader } from "@/components/table/SortableHeader";
import { QuickFilterChips } from "@/components/ui/chip/QuickFilterChips";
import { SearchInput } from "@/components/ui/input/SearchInput";
import { COLUMNS, TABLE_TOTAL_WIDTH } from "@/utils/constant/case";
import {
  DEFAULT_PAGE,
  ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
} from "@/utils/constant/table";
import { useAppContext } from "@/providers/AppProvider";
import { CaseFormValues, TableCaseSortKey } from "@/types/case";
import { caseToFormValues } from "@/mappers/case.mapper";
import { FormState } from "@/types/form";
import { ResettableSelect } from "@/components/ui/input/ResettableSelect";
import { TableSortOrder } from "@/types/table";

export default function Cases() {
  const { cases } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>(ALL_CASE_PRACTICE_AREAS);
  const [statusFilter, setStatusFilter] = useState<string>(ALL_CASE_STATUS);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);

  const [sortKey, setSortKey] = useState<TableCaseSortKey>("id");
  const [sortOrder, setSortOrder] = useState<TableSortOrder>("asc");

  const [caseFormState, setCaseFormState] = useState<FormState<CaseFormValues>>(
    {
      open: false,
      mode: "create",
    },
  );

  // Sort and filter cases
  const filteredAndSortedItems = useMemo(() => {
    if (!cases.length) return [];

    // Trim search to avoid whitespace-only searches
    const trimmedQuery = searchQuery.trim();
    const hasSearch = trimmedQuery.length > 0;
    const hasStatusFilter = statusFilter !== ALL_CASE_STATUS;
    const hasTypeFilter = typeFilter !== ALL_CASE_PRACTICE_AREAS;

    const q = hasSearch ? trimmedQuery.toLowerCase() : "";

    const filtered = cases.filter((c) => {
      if (hasSearch) {
        const matchesSearch =
          c.title.toLowerCase().includes(q) ||
          c.client.toLowerCase().includes(q) ||
          c.practiceArea.toLowerCase().includes(q);

        if (!matchesSearch) return false;
      }

      if (hasStatusFilter && c.status !== statusFilter) return false;
      if (hasTypeFilter && c.practiceArea !== typeFilter) return false;

      return true;
    });

    if (!sortKey || filtered.length <= 1) return filtered;

    const result = [...filtered];
    const direction = sortOrder === "asc" ? 1 : -1;

    result.sort((a, b) => {
      if (sortKey === "client") {
        return a.client.localeCompare(b.client) * direction;
      }

      if (sortKey === "title") {
        return a.title.localeCompare(b.title) * direction;
      }

      if (sortKey === "practiceArea") {
        return a.practiceArea.localeCompare(b.practiceArea) * direction;
      }

      if (sortKey === "status") {
        return a.status.localeCompare(b.status) * direction;
      }

      if (sortKey === "priority") {
        // Priority order: LOW, MEDIUM, HIGH, URGENT
        const priorityOrder = { LOW: 0, MEDIUM: 1, HIGH: 2, URGENT: 3 };
        const aPriority = priorityOrder[a.priority] ?? 0;
        const bPriority = priorityOrder[b.priority] ?? 0;
        return (aPriority - bPriority) * direction;
      }

      if (sortKey === "openedAt" || sortKey === "nextDeadline") {
        const aDate = a[sortKey] ? new Date(a[sortKey]).getTime() : null;
        const bDate = b[sortKey] ? new Date(b[sortKey]).getTime() : null;

        if (aDate == null && bDate == null) return 0;
        if (aDate == null) return 1;
        if (bDate == null) return -1;

        return (aDate - bDate) * direction;
      }

      // 🔹 ID - numeric sort
      if (sortKey === "id") {
        const aNum = Number(a.id);
        const bNum = Number(b.id);

        if (isNaN(aNum) || isNaN(bNum)) return 0;
        return (aNum - bNum) * direction;
      }

      return 0;
    });

    return result;
  }, [cases, searchQuery, statusFilter, typeFilter, sortKey, sortOrder]);

  useEffect(() => {
    const id = setTimeout(() => setPage(DEFAULT_PAGE), 0);
    return () => clearTimeout(id);
  }, [searchQuery, statusFilter, typeFilter]);

  const paginatedCases = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredAndSortedItems.slice(start, start + rowsPerPage);
  }, [filteredAndSortedItems, page, rowsPerPage]);

  const handleSort = (key: TableCaseSortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Paper className="p-4 mb-6 rounded-xl border border-gray-200 shadow-sm">
        <Grid container spacing={2} alignItems="center">
          {/* Search Field */}
          <Grid size={{ xs: 12, md: 5, lg: 5 }}>
            <SearchInput
              className="input-rounded-firm w-full"
              size="medium"
              placeholder="Search by case, client, or case type..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </Grid>

          {/* Filters and Actions Section */}
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

              {/* Status Filter */}
              <Grid size={{ xs: 6, sm: 5, md: 5, lg: 3 }}>
                <ResettableSelect
                  className="input-rounded-firm w-full"
                  label="Case Status"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={CaseStatus}
                  resetValue={ALL_CASE_STATUS}
                  resetLabel="All Status"
                />
              </Grid>

              {/* Practice Area Filter */}
              <Grid size={{ xs: 6, sm: 5, md: 5, lg: 3 }}>
                <ResettableSelect
                  className="input-rounded-firm w-full"
                  label="Practice Area"
                  value={typeFilter}
                  onChange={setTypeFilter}
                  options={CasePracticeArea}
                  resetValue={ALL_CASE_PRACTICE_AREAS}
                  resetLabel="All Practice Area"
                />
              </Grid>

              {/* New Case Button */}
              <Grid size={{ xs: 12, sm: 2, md: 2, lg: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="
                    button-firm bg-primary
                    hover:bg-primary-dark shadow-sm
                    w-full
				   "
                  onClick={() =>
                    setCaseFormState({
                      open: true,
                      mode: "create",
                    })
                  }
                >
                  <span className="hidden sm:inline">New</span>
                  <span className="sm:hidden">New Case</span>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Quick Filters */}
        <Box className="mt-4">
          <Grid container spacing={2} alignItems="center">
            {/* Status Quick Filters */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <QuickFilterChips
                title="Status"
                items={QUICK_FILTER_CASE_STATUS}
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </Grid>

            {/* Practice Area Quick Filters */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <QuickFilterChips
                title="Practice Area"
                items={QUICK_FILTER_CASE_TYPE}
                value={typeFilter}
                onChange={setTypeFilter}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Cases Table */}
      <Paper className="p-2 mb-12 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <TableContainer>
          <Table sx={{ minWidth: TABLE_TOTAL_WIDTH }}>
            <TableHead className="bg-gray-50">
              <TableRow className="bg-primary/25">
                {COLUMNS.map((column) => (
                  <TableCell
                    key={column.field}
                    className="font-semibold text-gray-700 whitespace-nowrap"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.sortable && column.sortKey ? (
                      <SortableHeader
                        label={column.label}
                        sortKey={column.sortKey}
                        activeSortKey={sortKey}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                      />
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCases.map((caseItem) => (
                <TableRow key={caseItem.id} className="hover:bg-primary/5">
                  <TableCell className="whitespace-nowrap">
                    <Typography className="font-mono text-gray-600">
                      #{caseItem.id}
                    </Typography>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Typography className="font-medium">
                      {caseItem.title}
                    </Typography>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Typography>{caseItem.client}</Typography>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, md: 10 }}>
                        <Chip
                          className={`
							w-full
							${CASE_TYPE_CONFIG[caseItem.practiceArea].styling?.unselectedClass}
						`}
                          label={CASE_TYPE_CONFIG[caseItem.practiceArea].label}
                          variant="filled"
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Box className="flex items-center gap-1">
                      <ScheduleIcon className="text-gray-400 text-sm" />
                      <Typography variant="body2">
                        {caseItem.openedAt}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell className="whitespace-nowrap items-center">
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, md: 10 }}>
                        <Chip
                          className="w-full"
                          label={CASE_STATUS_CONFIG[caseItem.status].label}
                          variant="filled"
                          color={
                            CASE_STATUS_CONFIG[caseItem.status].styling?.color
                          }
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Box className="flex gap-1">
                      <Tooltip title="View Notes">
                        <IconButton
                          size="small"
                          className="bg-primary/10 hover:bg-primary/20 text-primary"
                        >
                          <FileTextIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Case">
                        <IconButton
                          size="small"
                          className="bg-gray-100 hover:bg-gray-200 text-gray-600"
                          onClick={() =>
                            setCaseFormState({
                              open: true,
                              mode: "edit",
                              formData: caseToFormValues(caseItem),
                            })
                          }
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAndSortedItems.length === 0 && (
                <TableRow>
                  <TableCell
                    className="align-middle items-center text-center font-semibold"
                    colSpan={COLUMNS.length}
                  >
                    <Typography variant="subtitle1" className="text-gray-600">
                      No cases found matching your criteria.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          component="div"
          count={filteredAndSortedItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="border-t border-primary-light/50"
        />
      </Paper>

      {/* Case Form Dialog */}
      <CaseForm
        {...caseFormState}
        onClose={() =>
          setCaseFormState((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </Box>
  );
}
