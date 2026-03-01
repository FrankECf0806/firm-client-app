"use client";

import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  HorizontalRule as HorizontalRuleIcon,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";
import { BaseCard } from "./BaseCard";
import { DataCardProps } from "@/types/ui/card";

export function DataCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconBgColor,
  iconColor,
  linkTo,
  tooltip,
  sparkline,
  chartColor,
}: DataCardProps) {
  // Determine colors based on changeType
  const getColorsByType = () => {
    switch (changeType) {
      case "positive":
        return {
          chipBg: "bg-green-100",
          chipText: "text-green-700",
          sparkline: chartColor || "#10b981",
          iconBg: iconBgColor || "bg-green-500/10",
          iconText: iconColor || "text-green-500",
          trendIconColor: "text-green-600",
        };
      case "negative":
        return {
          chipBg: "bg-red-100",
          chipText: "text-red-700",
          sparkline: chartColor || "#ef4444",
          iconBg: iconBgColor || "bg-red-500/10",
          iconText: iconColor || "text-red-500",
          trendIconColor: "text-red-600",
        };
      default:
        return {
          chipBg: "bg-gray-100",
          chipText: "text-gray-700",
          sparkline: chartColor || "#3b82f6",
          iconBg: iconBgColor || "bg-blue-500/10",
          iconText: iconColor || "text-blue-500",
          trendIconColor: "text-gray-500",
        };
    }
  };

  const colors = getColorsByType();

  const TrendIcon =
    changeType === "positive"
      ? TrendingUpIcon
      : changeType === "negative"
        ? TrendingDownIcon
        : HorizontalRuleIcon;

  return (
    <BaseCard linkTo={linkTo} tooltip={tooltip}>
      {/* Two-column layout */}
      <Box className="flex justify-between h-full">
        {/* Left column: title + value + sparkline */}
        <Box className="flex flex-col flex-1 min-w-0">
          <Typography
            variant="body2"
            className="text-gray-500 font-medium text-sm mb-0.5"
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            className="font-bold text-gray-900 text-2xl leading-tight"
          >
            {value}
          </Typography>
          {sparkline && sparkline.length > 0 && (
            <Box className="h-6 w-full mt-1">
              <SparkLineChart
                data={sparkline}
                height={24}
                showTooltip
                curve="natural"
                color={colors.sparkline}
              />
            </Box>
          )}
        </Box>

        {/* Right column: icon + change */}
        <Box className="flex flex-col items-end justify-between ml-3">
          <Box
            className={`
              w-11 h-11 rounded-lg flex items-center justify-center
              ${colors.iconBg}
            `}
          >
            <Icon className={colors.iconText} sx={{ fontSize: 20 }} />
          </Box>
          {change && (
            <Box className="flex items-center gap-1">
              {(!sparkline || sparkline.length === 0) && (
                <TrendIcon className={`w-3.5 h-3.5 ${colors.trendIconColor}`} />
              )}
              <Typography
                variant="body2"
                className={`${colors.trendIconColor} font-medium text-xs whitespace-nowrap`}
              >
                {change}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </BaseCard>
  );
}
