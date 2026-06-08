"use client";

import { Box, Chip, Typography } from "@mui/material";
import { BaseCard } from "@/components/card/BaseCard";
import {
  MEETING_TYPE_CONFIG,
  MEETING_TYPE_ICONS,
} from "@/utils/constant/meeting";
import { MeetingTypesCardProps } from "@/types/ui/card";

export function MeetingTypesCard({ summary, total }: MeetingTypesCardProps) {
  if (!summary.length) {
    return (
      <BaseCard
        title="Meeting Distribution"
        className="h-min"
        contentClassName="p-4"
      >
        <Typography variant="body2" className="text-center text-gray-400 py-4">
          No meetings yet
        </Typography>
      </BaseCard>
    );
  }

  return (
    <BaseCard
      title="Meeting Distribution"
      className="h-min"
      contentClassName="p-3"
    >
      <Box className="space-y-1.5">
        {summary.map(([type, count]) => {
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
          const typeLabel = MEETING_TYPE_CONFIG[type].label;
          const Icon = MEETING_TYPE_ICONS[type];

          return (
            <Box key={type}>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-2 min-w-0">
                  {Icon && (
                    <Icon
                      fontSize="small"
                      className="text-primary/70 shrink-0"
                    />
                  )}

                  <Typography
                    variant="body2"
                    className="truncate capitalize font-medium"
                  >
                    {typeLabel}
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label={`${count}`}
                  className="bg-primary/10 text-primary font-semibold"
                />
              </Box>

              <Box className="flex items-center gap-2">
                <Box className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <Box
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </Box>

                <Typography
                  variant="caption"
                  className="font-medium text-gray-500 w-10 text-right"
                >
                  {percentage}%
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </BaseCard>
  );
}
