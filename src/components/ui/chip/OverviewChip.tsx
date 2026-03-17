import { Chip as MuiChip, ChipProps as MuiChipProps } from "@mui/material";
import { ReactNode } from "react";

interface OverviewChipProps extends Omit<
  MuiChipProps,
  "size" | "className" | "color"
> {
  label: ReactNode;
  color?: string;
  size?: "small" | "medium";
  className?: string;
}

export function OverviewChip({
  label,
  color = "bg-gray-100 text-gray-700",
  size = "small",
  className = "",
  ...props
}: OverviewChipProps) {
  const sizeClasses = {
    small: "text-[9px] h-4 w-16",
    medium: "text-xs h-6 w-20 ",
  };

  return (
    <MuiChip
      label={label}
      size={size}
      className={`${sizeClasses[size]} ${color} ${className}`}
      {...props}
    />
  );
}
