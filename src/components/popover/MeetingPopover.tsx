"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";

import {
  CalendarMonth as CalendarMonthIcon,
  ContentCopy as CopyIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
  Videocam as VideocamIcon,
  Person as PersonIcon,
  WorkOutline as WorkOutlineIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";

import { useAppContext } from "@/providers/AppProvider";
import { BaseCard } from "@/components/card/BaseCard";
import { formatLongDate, formatTime } from "@/utils/date";
import { normalizeUrl } from "@/utils/helper/global";
import { Meeting } from "@/types/meeting";
import { user } from "@/mock_data";
import {
  MEETING_TYPE_CONFIG,
  MEETING_TYPE_ICONS,
} from "@/utils/constant/meeting";

interface MeetingPopoverProps {
  open: boolean;
  meeting: Meeting;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onEdit: () => void;
}

export function MeetingPopover({
  open,
  meeting,
  anchorEl,
  onClose,
  onEdit,
}: MeetingPopoverProps) {
  const { cases } = useAppContext();
  const { getCaseById } = cases;

  if (!meeting) return null;

  const {
    id,
    title,
    type,
    caseId,
    start,
    end,
    location,
    meetingLink,
    attendees,
  } = meeting;

  const caseInfo = caseId ? getCaseById(caseId) : null;

  const TitleIcon = MEETING_TYPE_ICONS[type] || DescriptionIcon;
  const hasMeetingLink = !!meetingLink;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const isSameDay = startDate.toDateString() === endDate.toDateString();

  const formattedStartDate = formatLongDate(startDate);
  const formattedEndDate = formatLongDate(endDate);

  const formattedStartTime = formatTime(start);
  const formattedEndTime = formatTime(end);

  const dateTimeDisplay = isSameDay
    ? `${formattedStartDate}, ${formattedStartTime} – ${formattedEndTime}`
    : `${formattedStartDate} ${formattedStartTime} – ${formattedEndDate} ${formattedEndTime}`;

  const normalizedMeetingLink = meetingLink ? normalizeUrl(meetingLink) : "";

  const handleCopyMeetingLink = async () => {
    if (!meetingLink) return;

    await navigator.clipboard.writeText(meetingLink);
  };

  // Reminder: default 30 minutes before
  const reminderMinutes = 30;
  const reminderDate = new Date(startDate.getTime() - reminderMinutes * 60000);
  const reminderTime = formatTime(reminderDate);

  //   Current user's name for organizer display
  const currentUserName = user.name;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      disableRestoreFocus
      disableScrollLock={true}
      elevation={24}
      slotProps={{
        paper: {
          className:
            "rounded-2xl overflow-y-auto max-h-[90vh] w-[420px] max-w-[90vw] shadow-2xl bg-white",
        },
      }}
    >
      <BaseCard
        className="px-2 sm:px-5"
        contentClassName="m-auto overflow-x-hidden text-primary pt-4"
        title={title}
        titleVariant="body1"
        titleIcon={TitleIcon}
        titleIconClassName="text-primary-dark text-[1.5rem] mr-1 shrink-0 hover:text-primary!"
        action={
          <>
            <IconButton
              size="small"
              onClick={onEdit}
              className="hover:bg-primary/10"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={onClose}
              className="hover:bg-primary/10 sm:hidden"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Box className="p-4 space-y-2 md:space-y-4">
          {/* Date & Time */}
          <Box className="flex items-start gap-3">
            <CalendarMonthIcon fontSize="small" className="text-primary/50" />
            <Box className="text-sm text-gray-700">
              <Box className="font-medium">{dateTimeDisplay}</Box>
              <Box className="text-gray-500 text-xs mt-1">
                <AccessTimeIcon
                  fontSize="inherit"
                  className="inline mr-1 align-text-bottom text-primary/50"
                />
                {reminderMinutes} minutes before ({reminderTime})
              </Box>
            </Box>
          </Box>

          {/* Location */}
          {location && (
            <Box className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <LocationIcon fontSize="small" className="text-primary/50" />
              <span>{location}</span>
            </Box>
          )}

          {/* Meeting Link Section – redesigned */}
          <Box className="bg-primary/5 rounded-xl p-4 space-y-3">
            <Box className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <LinkIcon fontSize="small" className="text-gray-500" />
              <span>Meeting Link</span>
            </Box>
            {hasMeetingLink ? (
              <>
                <Box className="flex items-center justify-between gap-2 bg-white rounded-lg p-2 border border-gray-200">
                  <code className="text-xs text-gray-600 truncate">
                    {meetingLink}
                  </code>
                  <IconButton size="small" onClick={handleCopyMeetingLink}>
                    <CopyIcon fontSize="small" className="text-gray-500" />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<VideocamIcon />}
                  href={normalizedMeetingLink}
                  target="_blank"
                  fullWidth
                  className="bg-primary hover:bg-primary-dark normal-case shadow-none"
                >
                  Join Meeting
                </Button>
              </>
            ) : (
              <Box className="text-center py-3 text-gray-400 text-sm italic">
                No meeting link has been added.
              </Box>
            )}
          </Box>

          {/* Related Case */}
          {caseInfo && (
            <Box className="flex items-center gap-2 text-sm text-gray-700">
              <WorkOutlineIcon
                fontSize="small"
                className="text-primary/60 shrink-0"
              />
              <span className="truncate flex-1">{caseInfo.title}</span>
              <IconButton
                component="a"
                href={`/cases/${caseId}`}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                className="hover:bg-primary/10 shrink-0"
              >
                <OpenInNewIcon fontSize="small" className="text-gray-500" />
              </IconButton>
            </Box>
          )}

          {/* Meeting Type Chip */}
          <Box className="flex items-center">
            <Chip
              icon={<TitleIcon className="text-white font-light" />}
              label={type.replace(/_/g, " ").toLowerCase()}
              size="small"
              className={`${MEETING_TYPE_CONFIG[type]?.styling?.selectedClass || "bg-gray-500"} capitalize text-white px-2 truncate`}
            />
          </Box>

          {/* Organizer */}
          <Box className="flex items-center gap-3">
            <PersonIcon fontSize="small" className="text-primary/50" />
            <span className="text-sm text-gray-600">
              Organised by {currentUserName}
            </span>
          </Box>

          {/* Attendees */}
          {attendees && attendees.length > 0 && (
            <Box className="pt-2">
              <Typography
                variant="subtitle2"
                className="font-semibold text-gray-700 mb-2"
              >
                Attendees ({attendees.length})
              </Typography>
              <List dense className="bg-primary/5 rounded-xl p-1">
                {attendees.map((attendee, idx) => (
                  <ListItem key={idx} disablePadding className="py-1 px-2">
                    <ListItemAvatar className="min-w-8">
                      <Avatar className="w-6 h-6 text-[0.75rem] bg-primary/20 text-primary">
                        {(attendee[0] || "?").toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className="text-sm text-gray-600"
                      primary={attendee}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </BaseCard>
    </Popover>
  );
}
