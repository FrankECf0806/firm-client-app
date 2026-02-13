import { useState, useCallback } from "react";
import { Meeting, CreateMeetingInput } from "@/types/meeting";
import { mockMeetings } from "@/mock_data";

export function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);

  const resetMeetings = useCallback(() => {
    setMeetings(mockMeetings);
  }, []);

  const addMeeting = useCallback((input: CreateMeetingInput) => {
    const now = new Date().toISOString();
    const newMeeting: Meeting = {
      ...input,
      id: Date.now().toString(),
      status: "SCHEDULED",
      createdAt: now,
      updatedAt: now,
    };
    setMeetings((prev) => [...prev, newMeeting]);
    return newMeeting;
  }, []);

  const updateMeeting = useCallback((id: string, updates: Partial<Meeting>) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, ...updates, updatedAt: new Date().toISOString() }
          : m,
      ),
    );
  }, []);

  const deleteMeeting = useCallback((id: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const getMeetingById = useCallback(
    (id: string) => meetings.find((m) => m.id === id),
    [meetings],
  );

  const getMeetingsByCase = useCallback(
    (caseId: string) => meetings.filter((m) => m.caseId === caseId),
    [meetings],
  );

  const getMeetingsByDate = useCallback(
    (date: string) => meetings.filter((m) => m.date === date),
    [meetings],
  );

  const getUpcomingMeetings = useCallback(
    (days: number = 7) => {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + days);

      return meetings
        .filter((m) => {
          const meetingDate = new Date(m.date);
          return meetingDate >= today && meetingDate <= futureDate;
        })
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
    },
    [meetings],
  );

  return {
    meetings,
    addMeeting,
    updateMeeting,
    deleteMeeting,
    getMeetingById,
    getMeetingsByCase,
    getMeetingsByDate,
    getUpcomingMeetings,
    resetMeetings,
  };
}
