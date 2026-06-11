import { useMemo } from "react";
import { Notification } from "@/types/notification";
import { useAppContext } from "@/providers/AppProvider";
import { Meeting } from "@/types/meeting";
import { Communication } from "@/types/communication";
import { Document } from "@/types/document";
import { Case } from "@/types/case";

const MAX_DEADLINES = 5;
const MAX_MEETINGS = 3;
const MAX_COMMUNICATIONS = 5;
const MAX_DOCUMENTS = 3;
const MAX_DROPDOWN_ITEMS = 10;

export function useNotifications(): Notification[] {
  const { meetings, cases, documents, communications } = useAppContext();

  const { cases: caseList } = cases;
  const { meetings: meetingList } = meetings;
  const { documents: documentList } = documents;
  const { communications: communicationList } = communications;

  return useMemo(() => {
    const now = new Date();

    const notifications = [
      ...buildDeadlineNotifications(caseList, now),
      ...buildMeetingNotifications(meetingList, now),
      ...buildCommunicationNotifications(communicationList),
      ...buildDocumentNotifications(documentList, now),
    ];

    const severityRank = {
      CRITICAL: 0,
      HIGH: 1,
      MEDIUM: 2,
      LOW: 3,
    };

    return notifications
      .sort((a, b) => {
        const severityDiff =
          severityRank[a.severity] - severityRank[b.severity];

        if (severityDiff !== 0) {
          return severityDiff;
        }

        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .slice(0, MAX_DROPDOWN_ITEMS);
  }, [caseList, meetingList, documentList, communicationList]);
}

function buildDeadlineNotifications(cases: Case[], now: Date): Notification[] {
  const notifications: Notification[] = [];

  const overdueCases = cases
    .filter((c) => {
      if (!c.nextDeadline) return false;

      return new Date(c.nextDeadline) < now;
    })
    .slice(0, MAX_DEADLINES);

  overdueCases.forEach((c) => {
    notifications.push({
      id: `case-overdue-${c.id}`,
      title: c.title,
      subtitle: `Deadline missed on ${new Date(c.nextDeadline!).toLocaleDateString()}`,
      createdAt: c.nextDeadline!,
      read: false,
      showTimestamp: false,
      type: "DEADLINE",
      severity: "CRITICAL",
      entityId: c.id,
      entityType: "case",
      url: `/cases/${c.id}`,
    });
  });

  const upcomingCases = cases
    .filter((c) => {
      if (!c.nextDeadline) return false;

      const deadline = new Date(c.nextDeadline);

      const daysRemaining = Math.ceil(
        (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );

      return daysRemaining >= 0 && daysRemaining <= 1;
    })
    .slice(0, MAX_DEADLINES);

  upcomingCases.forEach((c) => {
    notifications.push({
      id: `case-upcoming-${c.id}`,
      title: c.title,
      subtitle: `Due ${new Date(c.nextDeadline!).toLocaleDateString()}`,
      createdAt: c.nextDeadline!,
      read: false,
      showTimestamp: false,
      type: "DEADLINE",
      severity: "HIGH",
      entityId: c.id,
      entityType: "case",
      url: `/cases/${c.id}`,
    });
  });

  return notifications;
}

function buildMeetingNotifications(
  meetings: Meeting[],
  now: Date,
): Notification[] {
  return meetings
    .filter((meeting) => {
      const start = new Date(meeting.start);

      const diffMinutes = (start.getTime() - now.getTime()) / (1000 * 60);

      return diffMinutes > 0 && diffMinutes <= 60;
    })
    .slice(0, MAX_MEETINGS)
    .map((meeting) => {
      const start = new Date(meeting.start);

      const minutes = Math.floor(
        (start.getTime() - now.getTime()) / (1000 * 60),
      );

      return {
        id: `meeting-${meeting.id}`,
        title: meeting.title,
        subtitle: `Starts in ${minutes} minutes`,
        createdAt: meeting.start,
        read: false,
        showTimestamp: true,
        type: "MEETING",
        severity: "HIGH",
        entityId: meeting.id,
        entityType: "meeting",
        url: "/calendar",
      } satisfies Notification;
    });
}

function buildCommunicationNotifications(
  communications: Communication[],
): Notification[] {
  return communications
    .filter((c) => c.status !== "READ")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, MAX_COMMUNICATIONS)
    .map(
      (comm) =>
        ({
          id: `comm-${comm.id}`,
          title: comm.subject,
          subtitle: "Unread client message",
          createdAt: comm.createdAt,
          read: false,
          showTimestamp: true,
          type: "COMMUNICATION",
          severity: "MEDIUM",
          entityId: comm.id,
          entityType: "communication",
          url: `/communications/${comm.id}`,
        }) satisfies Notification,
    );
}

function buildDocumentNotifications(
  documents: Document[],
  now: Date,
): Notification[] {
  const seventyTwoHoursAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000);

  return documents
    .filter((doc) => new Date(doc.createdAt) >= seventyTwoHoursAgo)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, MAX_DOCUMENTS)
    .map(
      (doc) =>
        ({
          id: `doc-${doc.id}`,
          title: doc.name,
          subtitle: "Uploaded recently",
          createdAt: doc.createdAt,
          read: false,
          showTimestamp: true,
          type: "DOCUMENT",
          severity: "LOW",
          entityId: doc.id,
          entityType: "document",
          url: `/documents/${doc.id}`,
        }) satisfies Notification,
    );
}
