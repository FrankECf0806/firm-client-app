"use client";

import { useState, useMemo, MouseEvent, useEffect, ChangeEvent } from "react";
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
import Link from "next/link";
import {
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Description as FileTextIcon,
} from "@mui/icons-material";
import { SearchInput } from "@/components/ui/input/SearchInput";
import {
  ALL_CLIENT_STATUS,
  ALL_CLIENT_TYPES,
  CLIENT_STATUS_CONFIG,
  CLIENT_TYPE_CONFIG,
  QUICK_FILTER_CLIENT_STATUS,
  QUICK_FILTER_CLIENT_TYPE,
  TABLE_TOTAL_WIDTH,
} from "@/utils/constant/client";
import {
  DEFAULT_PAGE,
  ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
} from "@/utils/constant/table";
import { ClientForm } from "@/components/forms/ClientForm";
import { SortableHeader } from "@/components/table/SortableHeader";
import { COLUMNS } from "@/utils/constant/client";
import { Client, ClientFormValues, TableClientSortKey } from "@/types/client";
import { FormState } from "@/types/form";
import { useAppContext } from "@/providers/AppProvider";
import { ResettableSelect } from "@/components/ui/input/ResettableSelect";
import { ClientStatus, ClientType } from "@/enums/client";
import { QuickFilterChips } from "@/components/ui/chip/QuickFilterChips";
import { clientToFormValues } from "@/mappers/client.mappers";
import { TableSortOrder } from "@/types/table";

export default function Clients() {
  const { clients } = useAppContext();
  const { clients: clientList } = clients;
  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState<string>(ALL_CLIENT_STATUS);
  const [typeFilter, setTypeFilter] = useState<string>(ALL_CLIENT_TYPES);

  const [sortKey, setSortKey] = useState<TableClientSortKey>("id");
  const [sortOrder, setSortOrder] = useState<TableSortOrder>("asc");
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);

  const [clientFormState, setClientFormState] = useState<
    FormState<ClientFormValues>
  >({
    open: false,
    mode: "create",
  });

  // Sort and filter clients
  const filteredAndSortedItems = useMemo(() => {
    if (!clientList.length) return [];

    // Trim search to avoid whitespace-only searches
    const trimmedQuery = searchQuery.trim();
    const hasSearch = trimmedQuery.length > 0;
    const hasStatusFilter = statusFilter !== ALL_CLIENT_STATUS;
    const hasTypeFilter = typeFilter !== ALL_CLIENT_TYPES;

    const q = hasSearch ? trimmedQuery.toLowerCase() : "";

    const filtered = clientList.filter((c) => {
      if (hasSearch) {
        const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();

        const matchesSearch =
          fullName.includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.phone?.toLowerCase().includes(q) ||
          c.company?.toLowerCase().includes(q);

        if (!matchesSearch) return false;
      }

      if (hasStatusFilter && c.status !== statusFilter) return false;
      if (hasTypeFilter && c.type !== typeFilter) return false;

      return true;
    });

    if (!sortKey || filtered.length <= 1) return filtered;

    const result = [...filtered];
    const direction = sortOrder === "asc" ? 1 : -1;

    result.sort((a, b) => {
      if (sortKey === "name") {
        return (
          `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`,
          ) * direction
        );
      }

      const aVal = a[sortKey as keyof Client];
      const bVal = b[sortKey as keyof Client];

      // 🔹 Null / undefined always go to the end
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (sortKey === "id") {
        const aNum = Number(aVal);
        const bNum = Number(bVal);

        if (isNaN(aNum) || isNaN(bNum)) return 0;

        return (aNum - bNum) * direction;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal) * direction;
      }

      if (aVal < bVal) return -1 * direction;
      if (aVal > bVal) return 1 * direction;

      return 0;
    });

    return result;
  }, [clientList, searchQuery, statusFilter, typeFilter, sortKey, sortOrder]);

  useEffect(() => {
    const id = setTimeout(() => setPage(DEFAULT_PAGE), 0);
    return () => clearTimeout(id);
  }, [searchQuery, statusFilter, typeFilter]);

  const paginatedClients = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredAndSortedItems.slice(start, start + rowsPerPage);
  }, [filteredAndSortedItems, page, rowsPerPage]);

  const handleSort = (key: TableClientSortKey) => {
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

          {/* Filters and Action Section */}
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
                  label="Client Status"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={ClientStatus}
                  resetValue={ALL_CLIENT_STATUS}
                  resetLabel="All Status"
                />
              </Grid>

              <Grid size={{ xs: 6, sm: 5, md: 5, lg: 3 }}>
                <ResettableSelect
                  className="input-rounded-firm w-full"
                  label="Client Type"
                  value={typeFilter}
                  onChange={setTypeFilter}
                  options={ClientType}
                  resetValue={ALL_CLIENT_TYPES}
                  resetLabel="All Types"
                />
              </Grid>

              {/* New Case Button */}
              <Grid size={{ xs: 12, sm: 2, md: 2, lg: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="
						button-firm bg-primary
						hover:bg-primary-dark shadow-sm
						w-full
					"
                  onClick={() =>
                    setClientFormState({
                      open: true,
                      mode: "create",
                    })
                  }
                >
                  <span className="hidden sm:inline">New</span>
                  <span className="sm:hidden">New Client</span>
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
                items={QUICK_FILTER_CLIENT_STATUS}
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </Grid>
            {/* Client Type Quick Filters */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <QuickFilterChips
                title="Client Type"
                items={QUICK_FILTER_CLIENT_TYPE}
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
              {paginatedClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-primary/5">
                  <TableCell className="whitespace-nowrap">
                    <Typography className="font-mono text-gray-600">
                      #{client.id}
                    </Typography>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Link href={`/clients/${client.id}`}>
                      <Typography className="font-medium text-primary hover:underline">
                        {client.firstName} {client.lastName}
                      </Typography>
                    </Link>
                    {client.company && (
                      <Typography variant="caption">
                        {client.company}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Typography>{client.email}</Typography>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Typography>{client.phone}</Typography>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, md: 10 }}>
                        <Chip
                          className={`
							w-full
							${CLIENT_TYPE_CONFIG[client.type].styling?.unselectedClass}
						`}
                          label={CLIENT_TYPE_CONFIG[client.type].label}
                          variant="filled"
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Typography>{client.address}</Typography>
                  </TableCell>
                  <TableCell className="whitespace-nowrap items-center">
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, md: 10 }}>
                        <Chip
                          className="w-full"
                          label={CLIENT_STATUS_CONFIG[client.status].label}
                          variant="filled"
                          color={
                            CLIENT_STATUS_CONFIG[client.status].styling?.color
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
                            setClientFormState({
                              open: true,
                              mode: "edit",
                              formData: clientToFormValues(client),
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
              {paginatedClients.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={COLUMNS.length}
                    className="text-center py-4"
                  >
                    <Typography variant="subtitle1" className="text-gray-600">
                      No clients found.
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

      <ClientForm
        {...clientFormState}
        onClose={() =>
          setClientFormState((prev) => ({
            ...prev,
            open: false,
          }))
        }
      ></ClientForm>
    </Box>
  );
}
