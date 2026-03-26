import { useMediaQuery, useTheme } from "@mui/material";

export type ResponsiveSize = "xs" | "sm" | "md" | "lg" | "xl";

export function useResponsiveSize(): ResponsiveSize {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  if (isXs) return "xs";
  if (isSm) return "sm";
  if (isMd) return "md";
  if (isLg || isXl) return "lg";
  return "xl";
}
