"use client";

import { useState, useMemo, useEffect } from "react";
import { Box, Button, Grid, Paper } from "@mui/material";
import { FilterList as FilterIcon, Add as AddIcon } from "@mui/icons-material";
import { SearchInput } from "@/components/ui/input/SearchInput";
import {
  ALL_CLIENT_STATUS,
  ALL_CLIENT_TYPES,
  QUICK_FILTER_CLIENT_STATUS,
  QUICK_FILTER_CLIENT_TYPE,
} from "@/utils/constant/client";
import { ClientForm } from "@/components/forms/ClientForm";
import { Client, ClientFormValues, TableClientSortKey } from "@/types/client";
import { FormState } from "@/types/form";
import { useAppContext } from "@/providers/AppProvider";
import { ResettableSelect } from "@/components/ui/input/ResettableSelect";
import { ClientStatus, ClientType } from "@/enums/client";
import { QuickFilterChips } from "@/components/ui/chip/QuickFilterChips";
import { clientToFormValues } from "@/mappers/client.mappers";
import { TableSortOrder } from "@/types/table";
import { DEFAULT_PAGE, ROWS_PER_PAGE } from "@/utils/constant/table";
import { ClientTable } from "@/components/table/ClientTable";

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
          c.company?.toLowerCase().includes(q) ||
          c.address?.toLowerCase().includes(q);

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

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <Box>
      {/* Filters Section */}
      <Paper className="p-4 mb-6 rounded-xl border border-gray-200 shadow-sm">
        <Grid container spacing={2} alignItems="center">
          {/* Search Field */}
          <Grid size={{ xs: 12, md: 5, lg: 5 }}>
            <SearchInput
              className="input-rounded-firm w-full"
              size="medium"
              placeholder="Search by name, email, phone, company or address..."
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

              {/* Type Filter */}
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

              {/* New Client Button */}
              <Grid size={{ xs: 12, sm: 2, md: 2, lg: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="button-firm bg-primary hover:bg-primary-dark shadow-sm w-full"
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <QuickFilterChips
                title="Status"
                items={QUICK_FILTER_CLIENT_STATUS}
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </Grid>
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

      {/* Clients Table */}
      <ClientTable
        data={paginatedClients}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSort={handleSort}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={filteredAndSortedItems.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onEditClient={(client) =>
          setClientFormState({
            open: true,
            mode: "edit",
            formData: clientToFormValues(client),
          })
        }
        onViewNotes={(client) => {
          // TODO: Implement view notes
          console.log("View notes for client:", client.id);
        }}
      />

      {/* Client Form Dialog */}
      <ClientForm
        {...clientFormState}
        onClose={() =>
          setClientFormState((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </Box>
  );
}
