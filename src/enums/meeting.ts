export enum MeetingStatus {
  SCHEDULED = "SCHEDULED",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  RESCHEDULED = "RESCHEDULED",
  NO_SHOW = "NO_SHOW",
}

export enum MeetingType {
  CLIENT_MEETING = "CLIENT_MEETING",
  INITIAL_CONSULTATION = "INITIAL_CONSULTATION",
  COURT_HEARING = "COURT_HEARING",
  DEPOSITION = "DEPOSITION",
  MEDIATION = "MEDIATION",
  ARBITRATION = "ARBITRATION",
  INTERNAL_REVIEW = "INTERNAL_REVIEW",
  CASE_STRATEGY = "CASE_STRATEGY",
  SETTLEMENT_DISCUSSION = "SETTLEMENT_DISCUSSION",
  WITNESS_INTERVIEW = "WITNESS_INTERVIEW",
  EXPERT_CONSULTATION = "EXPERT_CONSULTATION",
  VIDEO_CONFERENCE = "VIDEO_CONFERENCE",
  PHONE_CALL = "PHONE_CALL",
}

// Optional: Display labels for UI
export const MeetingStatusLabels: Record<MeetingStatus, string> = {
  [MeetingStatus.SCHEDULED]: "Scheduled",
  [MeetingStatus.CONFIRMED]: "Confirmed",
  [MeetingStatus.IN_PROGRESS]: "In Progress",
  [MeetingStatus.COMPLETED]: "Completed",
  [MeetingStatus.CANCELLED]: "Cancelled",
  [MeetingStatus.RESCHEDULED]: "Rescheduled",
  [MeetingStatus.NO_SHOW]: "No Show",
};

export const MeetingTypeLabels: Record<MeetingType, string> = {
  [MeetingType.CLIENT_MEETING]: "Client Meeting",
  [MeetingType.INITIAL_CONSULTATION]: "Initial Consultation",
  [MeetingType.COURT_HEARING]: "Court Hearing",
  [MeetingType.DEPOSITION]: "Deposition",
  [MeetingType.MEDIATION]: "Mediation",
  [MeetingType.ARBITRATION]: "Arbitration",
  [MeetingType.INTERNAL_REVIEW]: "Internal Review",
  [MeetingType.CASE_STRATEGY]: "Case Strategy",
  [MeetingType.SETTLEMENT_DISCUSSION]: "Settlement Discussion",
  [MeetingType.WITNESS_INTERVIEW]: "Witness Interview",
  [MeetingType.EXPERT_CONSULTATION]: "Expert Consultation",
  [MeetingType.VIDEO_CONFERENCE]: "Video Conference",
  [MeetingType.PHONE_CALL]: "Phone Call",
};

// Optional: Colors for UI badges
export const MeetingStatusColors: Record<MeetingStatus, string> = {
  [MeetingStatus.SCHEDULED]: "info",
  [MeetingStatus.CONFIRMED]: "success",
  [MeetingStatus.IN_PROGRESS]: "warning",
  [MeetingStatus.COMPLETED]: "default",
  [MeetingStatus.CANCELLED]: "error",
  [MeetingStatus.RESCHEDULED]: "warning",
  [MeetingStatus.NO_SHOW]: "error",
};
