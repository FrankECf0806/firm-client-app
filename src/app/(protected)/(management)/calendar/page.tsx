"use client";

import { Box, Button, Grid, Paper, Popover } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import type {
  EventClickArg,
  EventContentArg,
  EventHoveringArg,
  EventDropArg,
} from "@fullcalendar/core";
import { useCallback, useState, useRef, useMemo } from "react";
import { useAppContext } from "@/providers/AppProvider";
import { formatTime } from "@/utils/date";
import { MeetingForm } from "@/components/forms/MeetingForm";
import { Meeting, MeetingFormValues } from "@/types/meeting";
import { FormState } from "@/types/form";
import { MeetingPopover } from "@/components/popover/MeetingPopover";
import { BaseCard } from "@/components/card/BaseCard";

export default function Calendar() {
  const { meetings } = useAppContext();
  const { meetings: meetingList, getMeetingById, updateMeeting } = meetings;

  // Click popover state
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [clickPopoverAnchor, setClickPopoverAnchor] =
    useState<HTMLElement | null>(null);

  // Hover popover state
  const [hoverMeeting, setHoverMeeting] = useState<Meeting | null>(null);
  const [hoverPopoverAnchor, setHoverPopoverAnchor] =
    useState<HTMLElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Meeting form state
  const [meetingFormState, setMeetingFormState] = useState<
    FormState<MeetingFormValues>
  >({
    open: false,
    mode: "create",
  });

  // ----------------------------------------------------------------------
  // Memoized event renderer
  // ----------------------------------------------------------------------
  const renderEventContent = useCallback(({ event }: EventContentArg) => {
    const startTime = event.start ? formatTime(event.start.toISOString()) : "";
    const endTime = event.end ? formatTime(event.end.toISOString()) : "";
    const timeStr =
      startTime && endTime ? `${startTime} – ${endTime}` : startTime;
    return (
      <Box>
        <Box className="text-[0.65rem] font-semibold opacity-90! text-black/60">
          {timeStr}
        </Box>
        <Box className="truncate font-medium text-black/40">{event.title}</Box>
      </Box>
    );
  }, []);

  const upcomingMeetings = useMemo(() => {
    const now = new Date();

    return [...meetingList]
      .filter((meeting) => new Date(meeting.start).getTime() >= now.getTime())
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, 5);
  }, [meetingList]);

  const stats = useMemo(() => {
    const now = new Date();

    const today = meetingList.filter((meeting) => {
      const date = new Date(meeting.start);

      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    });

    const weekEnd = new Date();
    weekEnd.setDate(now.getDate() + 7);

    const thisWeek = meetingList.filter((meeting) => {
      const date = new Date(meeting.start);

      return date >= now && date <= weekEnd;
    });

    return {
      today: today.length,
      week: thisWeek.length,
      month: meetingList.length,
    };
  }, [meetingList]);

  // ----------------------------------------------------------------------
  // Click handler – opens full popover
  // ----------------------------------------------------------------------
  const handleEventClick = useCallback(
    ({ event, el }: EventClickArg) => {
      setHoverMeeting(null);
      const targetEl = el as HTMLElement;
      if (targetEl) {
        const meeting = getMeetingById(event.id);
        if (meeting) {
          setSelectedMeeting(meeting);
          setClickPopoverAnchor(targetEl);
        }
      }
    },
    [getMeetingById],
  );

  // ----------------------------------------------------------------------
  // Hover handlers – show quick tooltip with delay, hide with delay to avoid flicker
  // ----------------------------------------------------------------------
  const handleEventMouseEnter = useCallback(
    ({ event, el }: EventHoveringArg) => {
      // Clear any pending hide timeout
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      const targetEl = el as HTMLElement;
      if (targetEl) {
        const meeting = getMeetingById(event.id);
        if (meeting) {
          setHoverMeeting(meeting);
          setHoverPopoverAnchor(targetEl);
        }
      }
    },
    [getMeetingById],
  );

  const handleEventMouseLeave = useCallback(() => {
    // Delay hiding to allow moving to the popover itself (popover has pointerEvents: none)
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverMeeting(null);
      setHoverPopoverAnchor(null);
    }, 200);
  }, []);

  // ----------------------------------------------------------------------
  // Edit meeting from click popover
  // ----------------------------------------------------------------------
  const handleEditMeeting = useCallback(() => {
    setHoverMeeting(null);
    if (selectedMeeting) {
      setMeetingFormState({
        open: true,
        mode: "edit",
        formData: selectedMeeting,
      });
      setSelectedMeeting(null);
      setClickPopoverAnchor(null);
    }
  }, [selectedMeeting]);

  const handleEventDragStart = useCallback(() => {
    setHoverMeeting(null);
    setHoverPopoverAnchor(null);
  }, []);

  const handleEventDragDrop = useCallback(
    ({ event }: EventDropArg) => {
      const updatedMeeting = {
        ...getMeetingById(event.id),
        start: event.start ? event.start.toISOString() : undefined,
        end: event.end ? event.end.toISOString() : undefined,
      };
      updateMeeting(event.id, updatedMeeting);
    },
    [getMeetingById, updateMeeting],
  );

  return (
    <>
      <Box className="px-2 mb-6 py-0">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
          className="mb-4"
        >
          <Grid size={{ xs: 6, sm: 4, md: 2, lg: 1.5 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              className="button-firm bg-primary hover:bg-primary-dark shadow-sm w-full"
              onClick={() =>
                setMeetingFormState({
                  open: true,
                  mode: "create",
                  formData: {},
                })
              }
            >
              <span className="hidden sm:inline">New</span>
              <span className="sm:hidden">New Event</span>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 9 }}>
            <Paper
              elevation={2}
              className="p-2 sm:p-4 border border-gray-200 rounded-lg"
            >
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                height="auto"
                expandRows
                navLinks
                initialView="dayGridMonth"
                events={meetingList}
                eventContent={renderEventContent}
                eventDisplay="block"
                eventTimeFormat={{
                  hour: "2-digit",
                  minute: "2-digit",
                  meridiem: "short",
                }}
                eventClassNames="font-family text-xs overflow-hidden leading-tight! p-1 rounded-sm! border-0! bg-primary/25! border-l-4! border-primary!"
                dayHeaderClassNames="bg-primary p-2! text-white font-semibold hover:bg-primary/75!"
                buttonText={{
                  today: "Today",
                  month: "Month",
                  week: "Week",
                  day: "Day",
                  list: "List",
                }}
                slotLabelFormat={{
                  hour: "2-digit",
                  minute: "2-digit",
                  meridiem: "short",
                }}
                displayEventTime
                displayEventEnd
                eventOrder="start,-duration,allDay,title"
                eventOrderStrict
                firstDay={1}
                dayMaxEvents={3}
                editable
                selectable
                selectMirror
                weekends
                eventClick={handleEventClick}
                eventMouseEnter={handleEventMouseEnter}
                eventMouseLeave={handleEventMouseLeave}
                eventDragStart={handleEventDragStart}
                eventDrop={handleEventDragDrop}
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }} gap={2} className="flex flex-col">
            <BaseCard
              title="Upcoming Meetings"
              className="h-min"
              contentClassName="p-0 h-full text-primary"
            >
              <Box className="p-3 space-y-2">
                {upcomingMeetings.map((meeting) => (
                  <Paper
                    key={meeting.id}
                    variant="outlined"
                    className="
						p-2 rounded-lg
						shadow-lg
						hover:bg-primary/10 hover:shadow-xl
						transition-colors duration-150
						border-2 border-primary/10"
                  >
                    <Box className="font-medium text-sm truncate">
                      {meeting.title}
                    </Box>

                    <Box className="text-xs text-gray-500">
                      {formatTime(meeting.start)} -{" "}
                      {new Date(meeting.start).toLocaleDateString()}
                    </Box>
                  </Paper>
                ))}
              </Box>
            </BaseCard>
            <BaseCard
              title="Quick Stats"
              className="h-min"
              contentClassName="p-0 h-full text-primary"
            >
              <Box className="p-4 space-y-3 text-gray-500">
                <Box className="flex justify-between">
                  <span>Today</span>
                  <strong>{stats.today}</strong>
                </Box>

                <Box className="flex justify-between">
                  <span>This Week</span>
                  <strong>{stats.week}</strong>
                </Box>

                <Box className="flex justify-between">
                  <span>Total Meetings</span>
                  <strong>{stats.month}</strong>
                </Box>
              </Box>
            </BaseCard>
          </Grid>
        </Grid>
      </Box>

      {/* Meeting Form Dialog */}
      <MeetingForm
        {...meetingFormState}
        onClose={() =>
          setMeetingFormState((prev) => ({ ...prev, open: false }))
        }
      />

      {/* Hover Popover – quick tooltip (always mounted, content conditionally rendered) */}
      {hoverMeeting && (
        <Popover
          open={!!hoverMeeting}
          anchorEl={hoverPopoverAnchor}
          onClose={() => setHoverMeeting(null)}
          sx={{ pointerEvents: "none" }}
          disableRestoreFocus
          disableScrollLock={true}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              className:
                "bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg",
            },
          }}
        >
          <Box className="space-y-1 max-w-xs min-w-50">
            <Box className="font-semibold truncate">{hoverMeeting.title}</Box>
            <Box className="opacity-90">
              {formatTime(hoverMeeting.start)} – {formatTime(hoverMeeting.end)}
            </Box>
          </Box>
        </Popover>
      )}

      {/* Click Popover – full meeting details */}
      {selectedMeeting && (
        <MeetingPopover
          open={!!selectedMeeting}
          anchorEl={clickPopoverAnchor}
          meeting={selectedMeeting}
          onClose={() => {
            setSelectedMeeting(null);
            setClickPopoverAnchor(null);
          }}
          onEdit={handleEditMeeting}
        />
      )}
    </>
  );
}
