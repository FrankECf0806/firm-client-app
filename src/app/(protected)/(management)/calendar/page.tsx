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
import { useCallback, useMemo, useRef, useState } from "react";
import { useAppContext } from "@/providers/AppProvider";
import { formatTime } from "@/utils/date";
import { MeetingForm } from "@/components/forms/MeetingForm";
import { Meeting, MeetingFormValues, MeetingTypeKey } from "@/types/meeting";
import { FormState } from "@/types/form";
import { MeetingPopover } from "@/components/popover/MeetingPopover";
import { CalendarOverview } from "@/components/card/meeting/CalendarOverview";
import { CalendarStats, MeetingTypeSummary } from "@/types/ui/card";
import { UpcomingMeetingsCard } from "@/components/card/meeting/UpcomingMeetingsCard";
import { MeetingTypesCard } from "@/components/card/meeting/MeetingTypesCard";

// Helper to group meetings by type for the summary
const getMeetingTypeSummary = (meetings: Meeting[]): MeetingTypeSummary[] => {
  const summary: Partial<Record<MeetingTypeKey, number>> = {};
  meetings.forEach((meeting) => {
    const type = meeting.type;
    summary[type] = (summary[type] || 0) + 1;
  });
  return (Object.entries(summary) as MeetingTypeSummary[])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
};

// ----------------------------------------------------------------------
// Main Calendar Component
// ----------------------------------------------------------------------
export default function Calendar() {
  const { meetings } = useAppContext();
  const { meetings: meetingList, getMeetingById, updateMeeting } = meetings;

  const calendarEvents = useMemo(() => meetingList, [meetingList]);

  // Click popover state
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [clickPopoverAnchor, setClickPopoverAnchor] =
    useState<HTMLElement | null>(null);

  // Hover popover state
  const [hoverMeeting, setHoverMeeting] = useState<Meeting | null>(null);
  const [hoverPopoverAnchor, setHoverPopoverAnchor] =
    useState<HTMLElement | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Meeting form state
  const [meetingFormState, setMeetingFormState] = useState<
    FormState<MeetingFormValues>
  >({
    open: false,
    mode: "create",
  });

  const calendarRef = useRef<FullCalendar | null>(null);
  const isDraggingRef = useRef(false);
  const recentlyDraggedRef = useRef(false);

  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  // ----------------------------------------------------------------------
  // Event renderer
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

  // ----------------------------------------------------------------------
  // Sidebar data
  // ----------------------------------------------------------------------
  const upcomingMeetings = useMemo(() => {
    const now = new Date();
    return [...meetingList]
      .filter((meeting) => new Date(meeting.start).getTime() >= now.getTime())
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, 5);
  }, [meetingList]);

  const stats = useMemo<CalendarStats>(() => {
    const now = new Date();
    const today = meetingList.filter((meeting) => {
      const date = new Date(meeting.start);
      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    });
    const weekEnd = new Date(now);
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

  const meetingTypeSummary = useMemo(
    () => getMeetingTypeSummary(meetingList),
    [meetingList],
  );

  // ----------------------------------------------------------------------
  // Click handler
  // ----------------------------------------------------------------------
  const handleEventClick = useCallback(
    ({ event, el }: EventClickArg) => {
      if (recentlyDraggedRef.current) return;
      setHoverMeeting(null);
      const targetEl = el as HTMLElement;
      const meeting = getMeetingById(event.id);
      if (meeting) {
        setSelectedMeeting(meeting);
        setClickPopoverAnchor(targetEl);
      }
    },
    [getMeetingById],
  );

  // ----------------------------------------------------------------------
  // Hover handlers
  // ----------------------------------------------------------------------
  const handleEventMouseEnter = useCallback(
    ({ event, el }: EventHoveringArg) => {
      if (isDraggingRef.current) return;
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      const targetEl = el as HTMLElement;
      const meeting = getMeetingById(event.id);
      if (targetEl && meeting) {
        setHoverMeeting(meeting);
        setHoverPopoverAnchor(targetEl);
      }
    },
    [getMeetingById],
  );

  const handleEventMouseLeave = useCallback(() => {
    if (isDraggingRef.current) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverMeeting(null);
      setHoverPopoverAnchor(null);
    }, 200);
  }, []);

  // ----------------------------------------------------------------------
  // Edit meeting
  // ----------------------------------------------------------------------
  const handleEditMeeting = useCallback(() => {
    setHoverMeeting(null);
    if (!selectedMeeting) return;
    setMeetingFormState({
      open: true,
      mode: "edit",
      formData: selectedMeeting,
    });
    setSelectedMeeting(null);
    setClickPopoverAnchor(null);
  }, [selectedMeeting]);

  // ----------------------------------------------------------------------
  // Drag & drop
  // ----------------------------------------------------------------------
  const handleEventDragStart = useCallback(() => {
    isDraggingRef.current = true;
    setHoverMeeting(null);
    setHoverPopoverAnchor(null);
    setSelectedMeeting(null);
    setClickPopoverAnchor(null);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  }, []);

  const handleEventDragStop = useCallback(() => {
    isDraggingRef.current = false;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  }, []);

  const handleEventDrop = useCallback(
    (info: EventDropArg) => {
      recentlyDraggedRef.current = true;
      const meeting = getMeetingById(info.event.id);
      if (!meeting) {
        recentlyDraggedRef.current = false;
        return;
      }
      updateMeeting(info.event.id, {
        ...meeting,
        start: info.event.start?.toISOString() ?? meeting.start,
        end: info.event.end?.toISOString() ?? meeting.end,
      });
      window.setTimeout(() => {
        recentlyDraggedRef.current = false;
      }, 300);
    },
    [getMeetingById, updateMeeting],
  );

  const eventMouseEnter = isTouchDevice ? undefined : handleEventMouseEnter;
  const eventMouseLeave = isTouchDevice ? undefined : handleEventMouseLeave;

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
          <Grid size={{ xs: 12, lg: 9.5 }}>
            <Paper
              elevation={2}
              className="p-2 sm:p-4 border border-gray-200 rounded-lg"
            >
              <FullCalendar
                ref={calendarRef}
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
                events={calendarEvents}
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
                longPressDelay={300}
                eventLongPressDelay={300}
                eventDragMinDistance={8}
                dragRevertDuration={0}
                dragScroll
                editable
                selectable
                selectMirror
                weekends
                eventClick={handleEventClick}
                eventMouseEnter={eventMouseEnter}
                eventMouseLeave={eventMouseLeave}
                eventDragStart={handleEventDragStart}
                eventDrop={handleEventDrop}
                eventDragStop={handleEventDragStop}
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 2.5 }} gap={2}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <CalendarOverview stats={stats} />
              </Grid>
              <Grid size={12}>
                <UpcomingMeetingsCard meetings={upcomingMeetings} />
              </Grid>
              <Grid size={12}>
                <MeetingTypesCard
                  summary={meetingTypeSummary}
                  total={stats.month}
                />
              </Grid>
            </Grid>
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

      {/* Hover Popover */}
      {!isTouchDevice && hoverMeeting && (
        <Popover
          open={Boolean(hoverMeeting)}
          anchorEl={hoverPopoverAnchor}
          onClose={() => setHoverMeeting(null)}
          sx={{ pointerEvents: "none" }}
          disableRestoreFocus
          disableScrollLock
          anchorOrigin={{ vertical: "center", horizontal: "right" }}
          transformOrigin={{ vertical: "center", horizontal: "left" }}
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

      {/* Click Popover */}
      {selectedMeeting && (
        <MeetingPopover
          open={Boolean(selectedMeeting)}
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
