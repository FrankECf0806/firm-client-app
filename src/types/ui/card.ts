import { ReactNode } from "react";
import { TypographyProps } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import { MeetingTypeKey } from "../meeting";

export interface CardProps {
  linkTo?: string;
  tooltip?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export interface BaseCardProps extends CardProps {
  cardHeaderIcons?: ReactNode;
  cardHeaderClassName?: string;
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

// Calendar Types
export interface CalendarOverviewProps {
  stats: CalendarStats;
}

export interface CalendarStats {
  today: number;
  week: number;
  month: number;
}

// Meeting Types
export interface MeetingTypesCardProps {
  summary: MeetingTypeSummary[];
  total: number;
}

export type MeetingTypeSummary = [MeetingTypeKey, number];
