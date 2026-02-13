// src/types/communication.ts

import {
  CommunicationType,
  CommunicationStatus,
  CommunicationDirection,
} from "@/enums/communication";
import {
  ALL_COMMUNICATION_TYPES,
  ALL_COMMUNICATION_STATUSES,
  ALL_COMMUNICATION_DIRECTIONS,
} from "@/utils/constant/communication";

// ============ Enum Keys ============
export type CommunicationTypeKey = keyof typeof CommunicationType; // "EMAIL" | "CALL" | "MESSAGE"
export type CommunicationStatusKey = keyof typeof CommunicationStatus; // "READ" | "UNREAD" | "ARCHIVED"
export type CommunicationDirectionKey = keyof typeof CommunicationDirection; // "INBOUND" | "OUTBOUND"

// ============ Filter Types ============
export type CommunicationFilterType =
  | CommunicationTypeKey
  | typeof ALL_COMMUNICATION_TYPES;
export type CommunicationFilterStatus =
  | CommunicationStatusKey
  | typeof ALL_COMMUNICATION_STATUSES;
export type CommunicationFilterDirection =
  | CommunicationDirectionKey
  | typeof ALL_COMMUNICATION_DIRECTIONS;

/** Base Communication - shared fields for forms and creation */
export interface CommunicationBase {
  subject: string;
  content: string;
  clientId: string;
  clientName: string;
  caseId?: string;
  caseName?: string;
  type: CommunicationTypeKey;
  direction: CommunicationDirectionKey;
}

// Form values (same as base)
export type CommunicationFormValues = CommunicationBase;

// Create input (same as base)
export type CreateCommunicationInput = CommunicationBase;

/** Full Communication Entity - stored in AppProvider */
export interface Communication extends CommunicationBase {
  id: string;
  status: CommunicationStatusKey;
  unread: boolean;
  time: string; // Relative time display (e.g., "2 hours ago")
  createdAt: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
}

// ============ Table Sort Keys ============
export type TableCommunicationSortKey =
  | "id"
  | "subject"
  | "clientName"
  | "caseName"
  | "type"
  | "direction"
  | "status"
  | "createdAt";
