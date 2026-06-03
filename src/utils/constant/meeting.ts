import { SvgIconComponent } from "@mui/icons-material";
import {
  Group as GroupIcon,
  Phone as PhoneIcon,
  Videocam as VideocamIcon,
  Gavel as GavelIcon,
  Handshake as HandshakeIcon,
  School as SchoolIcon,
  Description as DescriptionIcon,
  Psychology as PsychologyIcon,
  Balance as BalanceIcon,
} from "@mui/icons-material";
import { TableColumn } from "@/types/table";
import { ConfigItem } from "@/types/ui";
import {
  MeetingFilterStatus,
  MeetingFilterType,
  MeetingTypeKey,
} from "@/types/meeting";

// ----------------------------------------------------------------------
// Quick Filter Keys (if you later add a meeting list page)
// ----------------------------------------------------------------------
export const ALL_MEETING_STATUS = "ALL_STATUS";
export const ALL_MEETING_TYPES = "ALL_TYPES";

// ----------------------------------------------------------------------
// Meeting Type Icons (similar to CLIENT_TYPE_ICONS)
// ----------------------------------------------------------------------
export const MEETING_TYPE_ICONS: Record<MeetingTypeKey, SvgIconComponent> = {
  CLIENT_MEETING: GroupIcon,
  INITIAL_CONSULTATION: SchoolIcon,
  COURT_HEARING: GavelIcon,
  DEPOSITION: DescriptionIcon,
  MEDIATION: HandshakeIcon,
  ARBITRATION: BalanceIcon,
  INTERNAL_REVIEW: PsychologyIcon,
  CASE_STRATEGY: GroupIcon,
  SETTLEMENT_DISCUSSION: HandshakeIcon,
  WITNESS_INTERVIEW: DescriptionIcon,
  EXPERT_CONSULTATION: SchoolIcon,
  VIDEO_CONFERENCE: VideocamIcon,
  PHONE_CALL: PhoneIcon,
};

// ----------------------------------------------------------------------
// Meeting Type Colours (used in chips, badges)
// ----------------------------------------------------------------------
export const MEETING_TYPE_COLORS: Record<MeetingTypeKey, string> = {
  COURT_HEARING: "#ef4444",
  CLIENT_MEETING: "#3b82f6",
  INITIAL_CONSULTATION: "#10b981",
  PHONE_CALL: "#ec489a",
  DEPOSITION: "#f97316",
  INTERNAL_REVIEW: "#8b5cf6",
  MEDIATION: "#06b6d4",
  CASE_STRATEGY: "#84cc16",
  EXPERT_CONSULTATION: "#14b8a6",
  ARBITRATION: "#a855f7",
  SETTLEMENT_DISCUSSION: "#f43f5e",
  WITNESS_INTERVIEW: "#06b6d4",
  VIDEO_CONFERENCE: "#3b82f6",
};

// ----------------------------------------------------------------------
// Meeting Status Configuration (similar to CLIENT_STATUS_CONFIG)
// ----------------------------------------------------------------------
export const MEETING_STATUS_CONFIG: Record<
  MeetingFilterStatus,
  ConfigItem<MeetingFilterStatus>
> = {
  [ALL_MEETING_STATUS]: {
    label: "All Status",
    styling: {
      color: "primary",
      selectedClass: "hover:bg-gray-100",
    },
    onClick: (setStatus) => setStatus(ALL_MEETING_STATUS),
  },
  SCHEDULED: {
    label: "Scheduled",
    styling: {
      color: "info",
      selectedClass: "hover:bg-sky-100 hover:text-sky-700",
    },
    onClick: (setStatus) => setStatus("SCHEDULED"),
  },
  CONFIRMED: {
    label: "Confirmed",
    styling: {
      color: "success",
      selectedClass: "hover:bg-emerald-100 hover:text-emerald-700",
    },
    onClick: (setStatus) => setStatus("CONFIRMED"),
  },
  IN_PROGRESS: {
    label: "In Progress",
    styling: {
      color: "warning",
      selectedClass: "hover:bg-amber-100 hover:text-amber-700",
    },
    onClick: (setStatus) => setStatus("IN_PROGRESS"),
  },
  COMPLETED: {
    label: "Completed",
    styling: {
      color: "success",
      selectedClass: "hover:bg-emerald-100 hover:text-emerald-700",
    },
    onClick: (setStatus) => setStatus("COMPLETED"),
  },
  CANCELLED: {
    label: "Cancelled",
    styling: {
      color: "error",
      selectedClass: "hover:bg-red-100 hover:text-red-500",
    },
    onClick: (setStatus) => setStatus("CANCELLED"),
  },
  RESCHEDULED: {
    label: "Rescheduled",
    styling: {
      color: "warning",
      selectedClass: "hover:bg-amber-100 hover:text-amber-700",
    },
    onClick: (setStatus) => setStatus("RESCHEDULED"),
  },
  NO_SHOW: {
    label: "No Show",
    styling: {
      color: "error",
      selectedClass: "hover:bg-red-100 hover:text-red-500",
    },
    onClick: (setStatus) => setStatus("NO_SHOW"),
  },
};

// ----------------------------------------------------------------------
// Meeting Type Configuration (for filters, pills, dropdowns)
// ----------------------------------------------------------------------
export const MEETING_TYPE_CONFIG: Record<
  MeetingFilterType,
  ConfigItem<MeetingFilterType>
> = {
  [ALL_MEETING_TYPES]: {
    label: "All Types",
    styling: {
      icon: undefined,
      selectedClass: "bg-gray-600 text-white",
      unselectedClass: "bg-gray-50 text-gray-700 border border-gray-200",
    },
    onClick: (setType) => setType(ALL_MEETING_TYPES),
  },
  CLIENT_MEETING: {
    label: "Client Meeting",
    styling: {
      icon: MEETING_TYPE_ICONS["CLIENT_MEETING"],
      selectedClass: "bg-blue-600 text-white",
      unselectedClass: "bg-blue-50 text-blue-700 border border-blue-200",
    },
    onClick: (setType) => setType("CLIENT_MEETING"),
  },
  INITIAL_CONSULTATION: {
    label: "Initial Consultation",
    styling: {
      icon: MEETING_TYPE_ICONS["INITIAL_CONSULTATION"],
      selectedClass: "bg-emerald-600 text-white",
      unselectedClass:
        "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },
    onClick: (setType) => setType("INITIAL_CONSULTATION"),
  },
  COURT_HEARING: {
    label: "Court Hearing",
    styling: {
      icon: MEETING_TYPE_ICONS["COURT_HEARING"],
      selectedClass: "bg-red-600 text-white",
      unselectedClass: "bg-red-50 text-red-700 border border-red-200",
    },
    onClick: (setType) => setType("COURT_HEARING"),
  },
  DEPOSITION: {
    label: "Deposition",
    styling: {
      icon: MEETING_TYPE_ICONS["DEPOSITION"],
      selectedClass: "bg-orange-600 text-white",
      unselectedClass: "bg-orange-50 text-orange-700 border border-orange-200",
    },
    onClick: (setType) => setType("DEPOSITION"),
  },
  MEDIATION: {
    label: "Mediation",
    styling: {
      icon: MEETING_TYPE_ICONS["MEDIATION"],
      selectedClass: "bg-cyan-600 text-white",
      unselectedClass: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    },
    onClick: (setType) => setType("MEDIATION"),
  },
  ARBITRATION: {
    label: "Arbitration",
    styling: {
      icon: MEETING_TYPE_ICONS["ARBITRATION"],
      selectedClass: "bg-purple-600 text-white",
      unselectedClass: "bg-purple-50 text-purple-700 border border-purple-200",
    },
    onClick: (setType) => setType("ARBITRATION"),
  },
  INTERNAL_REVIEW: {
    label: "Internal Review",
    styling: {
      icon: MEETING_TYPE_ICONS["INTERNAL_REVIEW"],
      selectedClass: "bg-violet-600 text-white",
      unselectedClass: "bg-violet-50 text-violet-700 border border-violet-200",
    },
    onClick: (setType) => setType("INTERNAL_REVIEW"),
  },
  CASE_STRATEGY: {
    label: "Case Strategy",
    styling: {
      icon: MEETING_TYPE_ICONS["CASE_STRATEGY"],
      selectedClass: "bg-lime-600 text-white",
      unselectedClass: "bg-lime-50 text-lime-700 border border-lime-200",
    },
    onClick: (setType) => setType("CASE_STRATEGY"),
  },
  SETTLEMENT_DISCUSSION: {
    label: "Settlement Discussion",
    styling: {
      icon: MEETING_TYPE_ICONS["SETTLEMENT_DISCUSSION"],
      selectedClass: "bg-rose-600 text-white",
      unselectedClass: "bg-rose-50 text-rose-700 border border-rose-200",
    },
    onClick: (setType) => setType("SETTLEMENT_DISCUSSION"),
  },
  WITNESS_INTERVIEW: {
    label: "Witness Interview",
    styling: {
      icon: MEETING_TYPE_ICONS["WITNESS_INTERVIEW"],
      selectedClass: "bg-teal-600 text-white",
      unselectedClass: "bg-teal-50 text-teal-700 border border-teal-200",
    },
    onClick: (setType) => setType("WITNESS_INTERVIEW"),
  },
  EXPERT_CONSULTATION: {
    label: "Expert Consultation",
    styling: {
      icon: MEETING_TYPE_ICONS["EXPERT_CONSULTATION"],
      selectedClass: "bg-indigo-600 text-white",
      unselectedClass: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    },
    onClick: (setType) => setType("EXPERT_CONSULTATION"),
  },
  VIDEO_CONFERENCE: {
    label: "Video Conference",
    styling: {
      icon: MEETING_TYPE_ICONS["VIDEO_CONFERENCE"],
      selectedClass: "bg-sky-600 text-white",
      unselectedClass: "bg-sky-50 text-sky-700 border border-sky-200",
    },
    onClick: (setType) => setType("VIDEO_CONFERENCE"),
  },
  PHONE_CALL: {
    label: "Phone Call",
    styling: {
      icon: MEETING_TYPE_ICONS["PHONE_CALL"],
      selectedClass: "bg-pink-600 text-white",
      unselectedClass: "bg-pink-50 text-pink-700 border border-pink-200",
    },
    onClick: (setType) => setType("PHONE_CALL"),
  },
};

// Quick filter presets (similar to your client filters)
export const QUICK_FILTER_MEETING_STATUS_KEYS: MeetingFilterStatus[] = [
  ALL_MEETING_STATUS,
  "SCHEDULED",
  "CONFIRMED",
];

export const QUICK_FILTER_MEETING_TYPE_KEYS: MeetingFilterType[] = [
  ALL_MEETING_TYPES,
  "CLIENT_MEETING",
  "COURT_HEARING",
  "VIDEO_CONFERENCE",
];

// ----------------------------------------------------------------------
// Table Columns (if you later add a meeting list table)
// ----------------------------------------------------------------------
export type TableMeetingSortKey =
  | "title"
  | "start"
  | "type"
  | "status"
  | "caseId";

export const MEETING_TABLE_COLUMNS: TableColumn<TableMeetingSortKey>[] = [
  {
    field: "title",
    label: "Title",
    minWidth: 250,
    sortable: true,
    sortKey: "title",
  },
  {
    field: "start",
    label: "Date & Time",
    minWidth: 200,
    sortable: true,
    sortKey: "start",
  },
  {
    field: "type",
    label: "Type",
    minWidth: 150,
    sortable: true,
    sortKey: "type",
  },
  {
    field: "status",
    label: "Status",
    minWidth: 120,
    sortable: true,
    sortKey: "status",
  },
  {
    field: "caseId",
    label: "Case",
    minWidth: 200,
    sortable: true,
    sortKey: "caseId",
  },
  { field: "actions", label: "Actions", minWidth: 120, align: "right" },
];
