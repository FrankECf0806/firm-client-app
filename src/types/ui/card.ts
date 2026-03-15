import { ReactNode } from "react";
import { TypographyProps } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

export interface CardProps {
  linkTo?: string;
  tooltip?: string;
  className?: string;
  onClick?: () => void;
}

export interface BaseCardProps extends CardProps {
  title?: string;
  titleIcon?: SvgIconComponent;
  titleVariant?: TypographyProps["variant"];
  titleIconClassName?: string;
  action?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
}

export interface DataCardProps extends CardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: SvgIconComponent;
  iconBgColor?: string;
  iconColor?: string;
  sparkline?: number[];
  chartColor?: string;
  size?: "sm" | "md" | "lg";
}

export interface PriorityCardProps extends CardProps {
  title: string;
  description: string;
  contentClassName?: string;
  type: "warning" | "info" | "success";
  actionLabel?: string;
}
