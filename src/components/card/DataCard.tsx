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
import { useResponsiveSize } from "@/hooks/useResponsiveSize";

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
  size: propSize,
}: DataCardProps) {
  const responsiveSize = useResponsiveSize();

  let size = propSize;
  if (!size) {
    if (responsiveSize === "xs" || responsiveSize === "sm") size = "sm";
    else if (responsiveSize === "md") size = "md";
    else size = "lg";
  }

  const getColorsByType = () => {
    switch (changeType) {
      case "positive":
        return {
          sparkline: chartColor || "#10b981",
          iconBg: iconBgColor || "bg-green-500/10",
          iconText: iconColor || "text-green-500",
          trendIconColor: "text-green-600",
        };
      case "negative":
        return {
          sparkline: chartColor || "#ef4444",
          iconBg: iconBgColor || "bg-red-500/10",
          iconText: iconColor || "text-red-500",
          trendIconColor: "text-red-600",
        };
      default:
        return {
          sparkline: chartColor || "#9E9E9E",
          iconBg: iconBgColor || "bg-gray-400/10",
          iconText: iconColor || "text-gray-400",
          trendIconColor: "text-gray-400",
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

  // Size-based classes
  const sizeClasses = {
    sm: {
      cardPadding: "p-0.5",
      titleSize: "text-xs",
      valueSize: "text-lg",
      iconContainer: "w-7 h-7",
      iconSize: 16,
      sparklineHeight: 20,
      changeTextSize: "text-[10px]",
      trendIconSize: "w-3 h-3",
    },
    md: {
      cardPadding: "p-0.5",
      titleSize: "text-sm",
      valueSize: "text-xl",
      iconContainer: "w-9 h-9",
      iconSize: 20,
      sparklineHeight: 24,
      changeTextSize: "text-xs",
      trendIconSize: "w-3.5 h-3.5",
    },
    lg: {
      cardPadding: "p-1",
      titleSize: "text-base",
      valueSize: "text-xl",
      iconContainer: "w-10 h-10",
      iconSize: 24,
      sparklineHeight: 30,
      changeTextSize: "text-sm",
      trendIconSize: "w-4 h-4",
    },
  };

  const classes = sizeClasses[size as keyof typeof sizeClasses];

  return (
    <BaseCard linkTo={linkTo} tooltip={tooltip} className={classes.cardPadding}>
      {/* Two-column layout */}
      <Box className="flex justify-between h-full">
        {/* Left column: title + value + sparkline */}
        <Box className="flex flex-col flex-1 min-w-0">
          <Typography
            variant="body2"
            className={`text-gray-500 font-medium ${classes.titleSize} mb-0.5`}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            className={`font-bold ${colors.trendIconColor} ${classes.valueSize} leading-tight`}
          >
            {value}
          </Typography>
          {sparkline && sparkline.length > 0 && (
            <Box className="h-6 w-full mt-1">
              <SparkLineChart
                data={sparkline}
                height={classes.sparklineHeight}
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
              rounded-lg flex items-center justify-center
              ${classes.iconContainer} ${colors.iconBg}
            `}
          >
            <Icon
              className={colors.iconText}
              sx={{ fontSize: classes.iconSize }}
            />
          </Box>
          {change && (
            <Box className="flex items-center gap-1">
              {(!sparkline || sparkline.length === 0) && (
                <TrendIcon
                  className={`${classes.trendIconSize} ${colors.trendIconColor}`}
                />
              )}
              <Typography
                variant="body2"
                className={`${colors.trendIconColor} font-medium ${classes.changeTextSize} whitespace-nowrap`}
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
