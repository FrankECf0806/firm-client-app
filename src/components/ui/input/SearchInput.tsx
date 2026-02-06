"use client";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { SearchInputProps } from "@/types/ui/input";

export function SearchInput({
  value,
  onChange,
  clearable = true,
  ...props
}: SearchInputProps) {
  const showClear = clearable && Boolean(value);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange("");
  };

  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-gray-400 text-md" />
            </InputAdornment>
          ),
          endAdornment: showClear ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <CloseOutlinedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
}
