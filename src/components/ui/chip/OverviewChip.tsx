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
  const sizeConfig = {
    small: {
      height: 18,
      fontSize: "10px",
      px: 1,
    },
    medium: {
      height: 24,
      fontSize: "12px",
      px: 1.5,
    },
  };

  const config = sizeConfig[size];

  return (
    <MuiChip
      label={label}
      className={`w-16 ${color} ${className}`}
      sx={{
        height: config.height,
        borderRadius: "8px",

        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        "& .MuiChip-label": {
          px: config.px,
          py: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          fontSize: config.fontSize,
        },
      }}
      {...props}
    />
  );
}
