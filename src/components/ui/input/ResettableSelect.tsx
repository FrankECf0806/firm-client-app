"use client";

import { Divider, MenuItem } from "@mui/material";
import { ClearableSelect } from "./ClearableSelect";
import { OptionsMap, ResettableSelectProps } from "@/types/ui";

export function ResettableSelect<T extends OptionsMap>({
  label,
  value,
  onChange,
  options,
  resetValue,
  resetLabel,
  size = "small",
  className,
  disabled,
}: ResettableSelectProps<T>) {
  return (
    <ClearableSelect
      label={label}
      value={value}
      onChange={onChange}
      clearValue={resetValue}
      clearable={value !== resetValue}
      size={size}
      className={className}
      disabled={disabled}
    >
      {resetValue && <MenuItem value={resetValue}>{resetLabel}</MenuItem>}
      <Divider />
      {Object.entries(options).map(([key, label]) => (
        <MenuItem key={key} value={key}>
          {label}
        </MenuItem>
      ))}
    </ClearableSelect>
  );
}
