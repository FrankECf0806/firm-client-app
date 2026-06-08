"use client";

import { Box, Typography } from "@mui/material";
import {
  Today as TodayIcon,
  Event as EventIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";

import { BaseCard } from "@/components/card/BaseCard";
import { CalendarOverviewProps } from "@/types/ui/card";

export function CalendarOverview({ stats }: CalendarOverviewProps) {
  const items = [
    {
      label: "Today",
      value: stats.today,
      icon: TodayIcon,
      highlight: true,
    },
    {
      label: "7 Days",
      value: stats.week,
      icon: EventIcon,
    },
    {
      label: "Total",
      value: stats.month,
      icon: CalendarMonthIcon,
    },
  ];

  return (
    <BaseCard
      title="Calendar Overview"
      className="h-min"
      contentClassName="p-3"
    >
      <Box className="grid grid-cols-3 gap-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Box
              key={item.label}
              className={`
                rounded-lg
                border border-primary/10
                bg-primary/5
                p-2
                text-center
                hover:bg-primary/10
                transition-all duration-200
                hover:shadow-md
                ${
                  item.highlight
                    ? "border-primary/20 bg-primary/5"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              <Icon fontSize="small" className="text-primary mx-auto mb-1" />

              <Typography variant="h6" className="font-bold leading-none">
                {item.value}
              </Typography>

              <Typography variant="caption" className="text-gray-500">
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </BaseCard>
  );
}
