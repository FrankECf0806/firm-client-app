// src/utils/constant/communication.ts

import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Markunread as UnreadIcon,
  MarkEmailRead as ReadIcon,
  Archive as ArchiveIcon,
  CallReceived as InboundIcon,
  CallMade as OutboundIcon,
} from "@mui/icons-material";
import {
  CommunicationType,
  CommunicationStatus,
  CommunicationDirection,
} from "@/enums/communication";
import {
  CommunicationTypeKey,
  CommunicationStatusKey,
  CommunicationDirectionKey,
  TableCommunicationSortKey,
  CommunicationFilterType,
  CommunicationFilterStatus,
  CommunicationFilterDirection,
} from "@/types/communication";
import { TableColumn } from "@/types/table";
import { ConfigItem } from "@/types/ui";
import { SvgIconComponent } from "@mui/icons-material";

// ============ Constants ============
export const ALL_COMMUNICATION_TYPES = "ALL_TYPES";
export const ALL_COMMUNICATION_STATUSES = "ALL_STATUSES";
export const ALL_COMMUNICATION_DIRECTIONS = "ALL_DIRECTIONS";

export const TABLE_TOTAL_WIDTH = 1200;

// ============ Type Icons ============
export const COMMUNICATION_TYPE_ICONS: Record<
  CommunicationTypeKey,
  SvgIconComponent
> = {
  EMAIL: EmailIcon,
  CALL: PhoneIcon,
  MESSAGE: ChatIcon,
};

// ============ Status Icons ============
export const COMMUNICATION_STATUS_ICONS: Record<
  CommunicationStatusKey,
  SvgIconComponent
> = {
  UNREAD: UnreadIcon,
  READ: ReadIcon,
  ARCHIVED: ArchiveIcon,
};

// ============ Direction Icons ============
export const COMMUNICATION_DIRECTION_ICONS: Record<
  CommunicationDirectionKey,
  SvgIconComponent
> = {
  INBOUND: InboundIcon,
  OUTBOUND: OutboundIcon,
};

// ============ Status Config ============
export const COMMUNICATION_STATUS_CONFIG: Record<
  CommunicationStatusKey,
  ConfigItem<CommunicationFilterStatus>
> = {
  UNREAD: {
    label: "Unread",
    styling: {
      selectedClass: "bg-blue-600 text-white",
      unselectedClass: "bg-blue-600 text-white", // Bold blue for unread
      icon: COMMUNICATION_STATUS_ICONS.UNREAD,
    },
    onClick: (setStatus) => setStatus(CommunicationStatus.UNREAD),
  },
  READ: {
    label: "Read",
    styling: {
      selectedClass: "bg-gray-600 text-white",
      unselectedClass: "bg-gray-100 text-gray-600 border border-gray-200", // Light gray for read
      icon: COMMUNICATION_STATUS_ICONS.READ,
    },
    onClick: (setStatus) => setStatus(CommunicationStatus.READ),
  },
  ARCHIVED: {
    label: "Archived",
    styling: {
      selectedClass: "bg-amber-600 text-white",
      unselectedClass: "bg-amber-50 text-amber-700 border border-amber-200", // Warm amber for archived
      icon: COMMUNICATION_STATUS_ICONS.ARCHIVED,
    },
    onClick: (setStatus) => setStatus(CommunicationStatus.ARCHIVED),
  },
};

// ============ Type Config ============
export const COMMUNICATION_TYPE_CONFIG: Record<
  CommunicationTypeKey,
  ConfigItem<CommunicationFilterType>
> = {
  EMAIL: {
    label: "Email",
    styling: {
      selectedClass: "bg-blue-600 text-white",
      unselectedClass: "bg-blue-50 text-blue-700 border border-blue-200", // Light blue for email
      icon: COMMUNICATION_TYPE_ICONS.EMAIL,
    },
    onClick: (setType) => setType(CommunicationType.EMAIL),
  },
  CALL: {
    label: "Call",
    styling: {
      selectedClass: "bg-green-600 text-white",
      unselectedClass: "bg-green-50 text-green-700 border border-green-200", // Green for calls
      icon: COMMUNICATION_TYPE_ICONS.CALL,
    },
    onClick: (setType) => setType(CommunicationType.CALL),
  },
  MESSAGE: {
    label: "Message",
    styling: {
      selectedClass: "bg-purple-600 text-white",
      unselectedClass: "bg-purple-50 text-purple-700 border border-purple-200", // Purple for messages
      icon: COMMUNICATION_TYPE_ICONS.MESSAGE,
    },
    onClick: (setType) => setType(CommunicationType.MESSAGE),
  },
};

// ============ Direction Config ============
export const COMMUNICATION_DIRECTION_CONFIG: Record<
  CommunicationDirectionKey,
  ConfigItem<CommunicationFilterDirection>
> = {
  INBOUND: {
    label: "Inbound",
    styling: {
      selectedClass: "bg-green-600 text-white",
      unselectedClass: "bg-green-50 text-green-700 border border-green-200",
      icon: COMMUNICATION_DIRECTION_ICONS.INBOUND,
    },
    onClick: (setDirection) => setDirection(CommunicationDirection.INBOUND),
  },
  OUTBOUND: {
    label: "Outbound",
    styling: {
      selectedClass: "bg-blue-600 text-white",
      unselectedClass: "bg-blue-50 text-blue-700 border border-blue-200",
      icon: COMMUNICATION_DIRECTION_ICONS.OUTBOUND,
    },
    onClick: (setDirection) => setDirection(CommunicationDirection.OUTBOUND),
  },
};

// ============ Quick Filters ============
export const QUICK_FILTER_COMMUNICATION_STATUS = [
  {
    value: CommunicationStatus.UNREAD,
    label: COMMUNICATION_STATUS_CONFIG.UNREAD.label,
    styling: COMMUNICATION_STATUS_CONFIG.UNREAD.styling,
  },
  {
    value: CommunicationStatus.READ,
    label: COMMUNICATION_STATUS_CONFIG.READ.label,
    styling: COMMUNICATION_STATUS_CONFIG.READ.styling,
  },
];

export const QUICK_FILTER_COMMUNICATION_TYPE = [
  {
    value: CommunicationType.EMAIL,
    label: COMMUNICATION_TYPE_CONFIG.EMAIL.label,
    styling: COMMUNICATION_TYPE_CONFIG.EMAIL.styling,
  },
  {
    value: CommunicationType.CALL,
    label: COMMUNICATION_TYPE_CONFIG.CALL.label,
    styling: COMMUNICATION_TYPE_CONFIG.CALL.styling,
  },
  {
    value: CommunicationType.MESSAGE,
    label: COMMUNICATION_TYPE_CONFIG.MESSAGE.label,
    styling: COMMUNICATION_TYPE_CONFIG.MESSAGE.styling,
  },
];

export const QUICK_FILTER_COMMUNICATION_DIRECTION = [
  {
    value: CommunicationDirection.INBOUND,
    label: COMMUNICATION_DIRECTION_CONFIG.INBOUND.label,
    styling: COMMUNICATION_DIRECTION_CONFIG.INBOUND.styling,
  },
  {
    value: CommunicationDirection.OUTBOUND,
    label: COMMUNICATION_DIRECTION_CONFIG.OUTBOUND.label,
    styling: COMMUNICATION_DIRECTION_CONFIG.OUTBOUND.styling,
  },
];

// ============ Table Columns ============
export const COLUMNS: TableColumn<TableCommunicationSortKey>[] = [
  {
    field: "id",
    label: "ID",
    minWidth: 80,
    sortable: true,
    sortKey: "id",
    align: "left",
  },
  {
    field: "type",
    label: "Type",
    minWidth: 100,
    sortable: true,
    sortKey: "type",
    align: "left",
  },
  {
    field: "subject",
    label: "Subject",
    minWidth: 250,
    sortable: true,
    sortKey: "subject",
    align: "left",
  },
  {
    field: "clientId",
    label: "Client",
    minWidth: 150,
    sortable: true,
    sortKey: "clientId",
    align: "left",
  },
  {
    field: "caseId",
    label: "Case",
    minWidth: 150,
    sortable: true,
    sortKey: "caseId",
    align: "left",
  },
  {
    field: "direction",
    label: "Direction",
    minWidth: 100,
    sortable: true,
    sortKey: "direction",
    align: "center",
  },
  {
    field: "status",
    label: "Status",
    minWidth: 100,
    sortable: true,
    sortKey: "status",
    align: "center",
  },
  {
    field: "time",
    label: "Received",
    minWidth: 120,
    sortable: true,
    sortKey: "createdAt",
    align: "right",
  },
  {
    field: "actions",
    label: "Actions",
    minWidth: 100,
    sortable: false,
    align: "center",
  },
];
