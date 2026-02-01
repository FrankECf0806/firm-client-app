"use client";

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  CloseOutlined as CloseOutlinedIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { useMemo, useState, MouseEvent, ChangeEvent } from "react";
import { ClearableSelect } from "@/components/ui/input/ClearableSelect";
import { CaseStatus, CaseType } from "@/enums/case";
import {
  QUICK_FILTER_CASE_STATUS,
  QUICK_FILTER_CASE_TYPE,
} from "@/utils/constant";
import NewCaseForm from "@/components/forms/NewCaseForm";
import { QuickFilterChips } from "@/components/ui/chip/QuickFilterChips";
import {
  COLUMNS,
  CURRENT_PAGE,
  ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
  TABLE_TOTAL_WIDTH,
} from "@/utils/constant/case";
import { mockCases } from "@/mock_data";

export default function Cases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL_TYPES");
  const [statusFilter, setStatusFilter] = useState<string>("ALL_STATUS");
  const [page, setPage] = useState(CURRENT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);

  const [newCaseOpen, setNewCaseOpen] = useState(false);

  const showClear = Boolean(searchQuery);

  // Sort and filter cases
  const filteredAndSortedCases = useMemo(() => {
    const filtered = mockCases.filter((caseItem) => {
      // Searchbar
      const matchesSearch =
        searchQuery === "" ||
        caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.type.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "ALL_STATUS" || caseItem.status === statusFilter;

      // Type filter
      const matchesType =
        typeFilter === "ALL_TYPES" || caseItem.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });

    return filtered;
  }, [searchQuery, typeFilter, statusFilter]);

  const paginatedCases = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredAndSortedCases.slice(start, start + rowsPerPage);
  }, [filteredAndSortedCases, page, rowsPerPage]);

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
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        maxWidth: "100vw", // Crucial for iPad
      }}
    >
      <Paper className="p-4 mb-6 rounded-xl border border-gray-200 shadow-sm">
        <Grid container spacing={1} alignItems="center">
          {/* Search Field */}
          <Grid size={{ xs: 12, md: 5, lg: 5 }}>
            <TextField
              className="input-rounded-firm w-full"
              size="medium"
              placeholder="Search by case, client, or case type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className="text-gray-400 text-md" />
                    </InputAdornment>
                  ),
                  endAdornment: showClear ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery("");
                        }}
                      >
                        <CloseOutlinedIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
            />
          </Grid>

          {/* Filters Section */}
          <Grid size={{ xs: 12, md: 7, lg: 7 }} justifyItems="center">
            <Box
              className="
                flex flex-col gap-2 w-full
                sm:flex-row sm:items-center sm:justify-end
                items-start
              "
            >
              <Box className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <FilterIcon className="text-gray-400 hidden lg:block" />

                <ClearableSelect
                  className="input-rounded-firm w-full sm:w-32 md:w-36"
                  size="small"
                  label="Case Status"
                  value={statusFilter}
                  clearValue="ALL_STATUS"
                  onChange={setStatusFilter}
                  clearable={statusFilter !== "ALL_STATUS"}
                >
                  <MenuItem value="ALL_STATUS">All Status</MenuItem>
                  <Divider />
                  {Object.entries(CaseStatus).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </ClearableSelect>

                <ClearableSelect
                  className="input-rounded-firm w-full sm:w-40 md:w-48"
                  size="small"
                  label="Case Type"
                  value={typeFilter}
                  clearValue="ALL_TYPES"
                  onChange={setTypeFilter}
                  clearable={typeFilter !== "ALL_TYPES"}
                >
                  <MenuItem value="ALL_TYPES">All Case Types</MenuItem>
                  <Divider />
                  {Object.entries(CaseType).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </ClearableSelect>
              </Box>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                className="
                  button-firm bg-primary
                  hover:bg-primary-dark shadow-sm
                  w-full sm:w-auto shrink-0
                "
                onClick={() => setNewCaseOpen(true)}
              >
                <span className="hidden sm:inline">New Case</span>
                <span className="sm:hidden">Add Case</span>
              </Button>
            </Box>
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

            {/* Case Type Quick Filters */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <QuickFilterChips
                title="Case Type"
                items={QUICK_FILTER_CASE_TYPE}
                value={typeFilter}
                onChange={setTypeFilter}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* New Case Form Dialog */}
      <NewCaseForm open={newCaseOpen} onClose={() => setNewCaseOpen(false)} />

      {/* Cases Table */}
      <Paper className="p-4 mb-6 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Box
          className="overflow-x-auto"
          sx={{
            maxWidth: "100%",
            WebkitOverflowScrolling: "touch", // Smooth scrolling for iOS
            "&::-webkit-scrollbar": {
              height: 6,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: 3,
            },
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: TABLE_TOTAL_WIDTH }}>
              <TableHead className="bg-gray-50">
                <TableRow className="bg-primary/25">
                  {COLUMNS.map((column) => (
                    <TableCell
                      key={column.field}
                      className="font-semibold text-gray-700 whitespace-nowrap"
                      style={{ minWidth: column.width }}
                    >
                      {column.label}
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
                      <Typography>{caseItem.type}</Typography>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Box className="flex items-center gap-1">
                        <ScheduleIcon className="text-gray-400 text-sm" />
                        <Typography variant="body2">
                          {caseItem.openDate}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Typography>{caseItem.status}</Typography>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Box className="flex gap-1">
                        <Tooltip title="View Notes">
                          <IconButton
                            size="small"
                            className="bg-primary/10 hover:bg-primary/20 text-primary"
                            // onClick={() => handleViewCase(caseItem)}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Case">
                          <IconButton
                            size="small"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAndSortedCases.length === 0 && (
                  <TableRow>
                    <TableCell
                      className="align-middle items-center text-center font-semibold"
                      colSpan={7}
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
        </Box>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          component="div"
          count={filteredAndSortedCases.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="border-t border-primary-light/50"
        />
      </Paper>
    </Box>
  );
}
