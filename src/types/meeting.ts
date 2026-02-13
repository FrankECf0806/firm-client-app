import { MeetingStatus, MeetingType } from "@/enums/meeting";

export type MeetingStatusKey = keyof typeof MeetingStatus;
export type MeetingTypeKey = keyof typeof MeetingType;

/** Base Meeting - shared fields for forms and creation */
export interface MeetingBase {
  title: string;
  caseId: string;
  caseName: string;
  date: string;
  time: string;
  duration: number;
  type: MeetingTypeKey;
  location?: string;
  attendees?: string[];
  agenda?: string;
  notes?: string;
}

// Form values (same as base)
export type MeetingFormValues = MeetingBase;

// Create input (same as base)
export type CreateMeetingInput = MeetingBase;

/** Full Meeting Entity - stored in AppProvider */
export interface Meeting extends MeetingBase {
  id: string;
  status: MeetingStatusKey;
  createdAt?: string;
  updatedAt?: string;
}
