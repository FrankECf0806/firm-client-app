import { ReactNode } from "react";
import { TypographyProps } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

export interface BaseCardProps {
  title?: string;
  titleIcon?: ReactNode;
  titleVariant?: TypographyProps["variant"];
  titleIconClassName?: string;
  action?: ReactNode;
  children: ReactNode;
  linkTo?: string;
  tooltip?: string;
  className?: string;
  contentClassName?: string;
  onClick?: () => void;
}

export interface DataCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: SvgIconComponent;
  iconBgColor?: string;
  iconColor?: string;
  linkTo?: string;
  tooltip?: string;
  sparkline?: number[];
  chartColor?: string;
}
