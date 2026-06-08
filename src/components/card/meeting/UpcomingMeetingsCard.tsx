"use client";

import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { Event as EventIcon } from "@mui/icons-material";
import { BaseCard } from "@/components/card/BaseCard";
import { Meeting } from "@/types/meeting";
import { formatTime } from "@/utils/date";
import {
  MEETING_TYPE_CONFIG,
  MEETING_TYPE_ICONS,
} from "@/utils/constant/meeting";

interface UpcomingMeetingsCardProps {
  meetings: Meeting[];
}

export function UpcomingMeetingsCard({ meetings }: UpcomingMeetingsCardProps) {
  if (!meetings.length) {
    return (
      <BaseCard
        title="Upcoming Meetings"
        className="h-min"
        contentClassName="p-0"
      >
        <Box className="py-8 text-center">
          <Typography variant="body2" className="text-gray-400">
            No upcoming meetings
          </Typography>
        </Box>
      </BaseCard>
    );
  }

  return (
    <BaseCard
      title="Upcoming Meetings"
      className="h-min"
      contentClassName="p-3"
    >
      <Box className="space-y-2">
        {meetings.map((meeting) => {
          const Icon = MEETING_TYPE_ICONS[meeting.type];
          const typeLabel = MEETING_TYPE_CONFIG[meeting.type].label;
          const meetingDate = new Date(meeting.start);

          return (
            <Box
              key={meeting.id}
              className="
                flex gap-3 items-center
                rounded-xl
                border border-primary/20
                p-1
                cursor-pointer
                transition-all duration-200
                hover:border-primary/30
                hover:shadow-md
              "
            >
              {/* Date Badge */}
              <Box
                className="
                  w-11 h-11
                  rounded-xl
                  bg-primary/10
                  flex flex-col
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Typography
                  variant="caption"
                  className="uppercase text-primary font-medium leading-none"
                >
                  {meetingDate.toLocaleDateString(undefined, {
                    month: "short",
                  })}
                </Typography>

                <Typography
                  variant="body2"
                  className="font-bold text-primary leading-none"
                >
                  {meetingDate.getDate()}
                </Typography>
              </Box>

              {/* Content */}
              <Box className="flex-1 min-w-0">
                <Typography variant="body2" className="font-semibold truncate">
                  {meeting.title}
                </Typography>

                <Typography variant="caption" className="block text-gray-500">
                  {formatTime(meeting.start)}
                </Typography>
              </Box>

              {/* Avatar with Tooltip */}
              <Tooltip title={`${typeLabel}`} arrow>
                <Avatar className="w-8 h-8 bg-primary/10 text-primary shrink-0">
                  {Icon ? (
                    <Icon fontSize="small" />
                  ) : (
                    <EventIcon fontSize="small" />
                  )}
                </Avatar>
              </Tooltip>
            </Box>
          );
        })}
      </Box>
    </BaseCard>
  );
}
