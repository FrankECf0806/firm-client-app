import { MeetingStatus, MeetingType } from "@/enums/meeting";
import {
  ALL_MEETING_STATUS,
  ALL_MEETING_TYPES,
} from "@/utils/constant/meeting";

// Meeting Status
export type MeetingStatusKey = keyof typeof MeetingStatus; // "SCHEDULED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "NO_SHOW"
export type MeetingFilterStatus = MeetingStatusKey | typeof ALL_MEETING_STATUS; // "ALL_STATUS" | "SCHEDULED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "NO_SHOW"

// Meeting Type
export type MeetingTypeKey = keyof typeof MeetingType; // "CLIENT_MEETING" | "INITIAL_CONSULTATION" | "COURT_HEARING" | "DEPOSITION" | "MEDIATION" | "ARBITRATION" | "INTERNAL_REVIEW" | "CASE_STRATEGY" | "SETTLEMENT_DISCUSSION" | "WITNESS_INTERVIEW" | "EXPERT_CONSULTATION" | "VIDEO_CONFERENCE" | "PHONE_CALL"
export type MeetingFilterType = MeetingTypeKey | typeof ALL_MEETING_TYPES; // "ALL_TYPES" | "CLIENT_MEETING" | "INITIAL_CONSULTATION" | "COURT_HEARING" | "DEPOSITION" | "MEDIATION" | "ARBITRATION" | "INTERNAL_REVIEW" | "CASE_STRATEGY" | "SETTLEMENT_DISCUSSION" | "WITNESS_INTERVIEW" | "EXPERT_CONSULTATION" | "VIDEO_CONFERENCE" | "PHONE_CALL"

/** Base Meeting - shared fields for forms and creation */
export interface MeetingBase {
  title: string;
  caseId?: string;
  start: string;
  end: string;
  type: MeetingTypeKey;
  meetingLink?: string;
  location?: string;
  attendees?: string[];
  agenda?: string;
  notes?: string;
}

// Form values (same as base)
export type MeetingFormValues = Omit<Meeting, "createdAt" | "updatedAt">;

// Create input (same as base)
export type CreateMeetingInput = MeetingBase;

/** Full Meeting Entity - stored in AppProvider */
export interface Meeting extends MeetingBase {
  id: string;
  status: MeetingStatusKey;
  createdAt?: string;
  updatedAt?: string;
}
