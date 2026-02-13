import { CommunicationType, CommunicationStatus } from "@/enums/communication";
import {
  CommunicationTypeKey,
  CommunicationStatusKey,
  CommunicationDirectionKey,
} from "@/types/communication";

// ============ Constants ============
export const ALL_COMMUNICATION_TYPES = "ALL_TYPES";
export const ALL_COMMUNICATION_STATUSES = "ALL_STATUSES";
export const ALL_COMMUNICATION_DIRECTIONS = "ALL_DIRECTIONS";

export const TABLE_TOTAL_WIDTH = 1200;

// ============ Status Config ============
export const COMMUNICATION_STATUS_CONFIG: Record<
  CommunicationStatusKey,
  {
    label: string;
    styling: {
      color?:
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning";
      selectedClass?: string;
      unselectedClass?: string;
    };
  }
> = {
  UNREAD: {
    label: "Unread",
    styling: {
      color: "info",
      selectedClass: "bg-blue-600 text-white",
      unselectedClass:
        "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100",
    },
  },
  READ: {
    label: "Read",
    styling: {
      color: "success",
      selectedClass: "bg-green-600 text-white",
      unselectedClass:
        "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
    },
  },
  ARCHIVED: {
    label: "Archived",
    styling: {
      color: "default",
      selectedClass: "bg-gray-600 text-white",
      unselectedClass:
        "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100",
    },
  },
};

// ============ Type Config ============
export const COMMUNICATION_TYPE_CONFIG: Record<
  CommunicationTypeKey,
  {
    label: string;
    styling: {
      selectedClass: string;
      unselectedClass: string;
    };
  }
> = {
  EMAIL: {
    label: "Email",
    styling: {
      selectedClass: "bg-blue-600 text-white",
      unselectedClass:
        "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100",
    },
  },
  CALL: {
    label: "Call",
    styling: {
      selectedClass: "bg-green-600 text-white",
      unselectedClass:
        "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
    },
  },
  MESSAGE: {
    label: "Message",
    styling: {
      selectedClass: "bg-purple-600 text-white",
      unselectedClass:
        "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100",
    },
  },
};

// ============ Direction Config ============
export const COMMUNICATION_DIRECTION_CONFIG: Record<
  CommunicationDirectionKey,
  {
    label: string;
    icon: string;
  }
> = {
  INBOUND: {
    label: "Inbound",
    icon: "⬇️",
  },
  OUTBOUND: {
    label: "Outbound",
    icon: "⬆️",
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

// ============ Table Columns ============
import { TableColumn } from "@/types/table";
import { Communication } from "@/types/communication";

export const COLUMNS: TableColumn<keyof Communication>[] = [
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
    field: "clientName",
    label: "Client",
    minWidth: 150,
    sortable: true,
    sortKey: "clientName",
    align: "left",
  },
  {
    field: "caseName",
    label: "Case",
    minWidth: 150,
    sortable: true,
    sortKey: "caseName",
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
