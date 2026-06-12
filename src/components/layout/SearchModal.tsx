"use client";

import {
  Dialog,
  Box,
  InputBase,
  Typography,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Folder as FolderIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/providers/AppProvider";
import { useGlobalSearch } from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const { cases, clients } = useAppContext();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query);
  const results = useGlobalSearch({
    query: debouncedQuery,
    cases: cases.cases,
    clients: clients.clients,
  });

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setQuery("");
        setSelectedIndex(-1);
      }, 0);
    }
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(
            (prev) => (prev - 1 + results.length) % results.length,
          );
          break;
        case "Enter":
          if (selectedIndex >= 0 && results[selectedIndex]) {
            router.push(results[selectedIndex].href);
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [open, results, selectedIndex, router, onClose],
  );

  // Auto‑scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      selectedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const hasMinChars = query.trim().length >= 3;
  const isLoading = query !== debouncedQuery && hasMinChars;
  const showResults = !isLoading && hasMinChars;

  const clearSearch = () => {
    setQuery("");
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: "rounded-xl shadow-2xl overflow-hidden",
        sx: { height: "auto", minHeight: 200 },
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Header with search input */}
      <Box className="p-4 pb-2 border-b border-gray-100">
        <Box className="flex items-center gap-2">
          <SearchIcon className="text-primary/60 text-xl md:text-2xl" />
          <InputBase
            inputRef={inputRef}
            autoFocus
            fullWidth
            value={query}
            placeholder="Search cases, clients, documents… (min. 3 characters)"
            onChange={(e) => setQuery(e.target.value)}
            className="text-sm sm:text-base"
          />
          {query && (
            <IconButton
              size="small"
              onClick={clearSearch}
              className="hover:bg-primary/10"
            >
              <CloseIcon fontSize="small" className="text-gray-400" />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Results area */}
      <Box ref={listRef} className="max-h-100 overflow-y-auto p-2">
        {!hasMinChars && (
          <Box className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <SearchIcon className="text-gray-300 text-5xl mb-3" />
            <Typography className="text-gray-500 font-medium text-xs md:text-base">
              Type at least 3 characters to search
            </Typography>
            <Typography className="text-gray-400 text-[10px] md:text-xs">
              Search across cases, clients, and more
            </Typography>
          </Box>
        )}

        {isLoading && (
          <Box className="flex justify-center py-8">
            <CircularProgress size={32} className="text-primary" />
          </Box>
        )}

        {showResults && results.length === 0 && (
          <Box className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <SearchIcon className="text-gray-300 text-5xl mb-3" />
            <Typography className="text-gray-500 font-medium text-xs sm:text-base">
              No results found
            </Typography>
            <Typography
              variant="caption"
              className="text-gray-400 text-[10px] md:text-xs"
            >
              We couldn&apos;t find anything for “{query}”
            </Typography>
          </Box>
        )}

        {showResults &&
          results.length > 0 &&
          ["case", "client"].map((type) => {
            const filtered = results.filter((r) => r.type === type);
            if (filtered.length === 0) return null;

            const Icon = type === "case" ? FolderIcon : PersonIcon;

            return (
              <Box key={type}>
                <Typography
                  variant="caption"
                  className="px-3 py-1 block text-primary font-semibold uppercase text-xs tracking-wider"
                >
                  {type === "case" ? "Cases" : "Clients"}
                </Typography>
                {filtered.map((result) => {
                  const globalIdx = results.findIndex(
                    (r) => r.id === result.id && r.type === result.type,
                  );
                  return (
                    <Box
                      key={`${result.type}-${result.id}`}
                      className={`
                        flex items-start gap-3 px-3 py-1 m-1 rounded-lg cursor-pointer
                        transition-all duration-150
                        ${selectedIndex === globalIdx ? "bg-primary/10 ring-1 ring-primary/20" : "hover:bg-primary/5"}
                      `}
                      onClick={() => {
                        router.push(result.href);
                        onClose();
                      }}
                    >
                      <Box className="mt-0.5 shrink-0">
                        <Icon className="text-primary/60 w-5 h-5" />
                      </Box>
                      <Box className="flex-1 min-w-0">
                        <Typography className="font-medium text-gray-700 truncate text-xs sm:text-sm">
                          {result.title}
                        </Typography>
                        {result.subtitle && (
                          <Typography className="text-gray-500 line-clamp-1 text-[10px] md:text-xs">
                            {result.subtitle}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}
                <Divider className="my-2" />
              </Box>
            );
          })}
      </Box>

      {/* Footer with keyboard hints – hidden on very small screens */}
      <Box className="flex px-4 py-2 border-t border-gray-100 bg-gray-50 justify-between text-xs text-gray-400">
        <Box className="flex items-center gap-4">
          <span>↑↓</span>
          <span>Navigate</span>
        </Box>
        <Box className="flex items-center gap-4">
          <span>⏎</span>
          <span>Select</span>
        </Box>
        <Box className="flex items-center gap-4">
          <span>⎋</span>
          <span>Close</span>
        </Box>
        <Box className="flex items-center gap-4">
          <span>⌘K</span>
          <span>Open</span>
        </Box>
      </Box>
    </Dialog>
  );
}
