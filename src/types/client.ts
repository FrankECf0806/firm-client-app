import { ClientStatus, ClientType } from "@/enums/client";
import { ALL_CLIENT_STATUS, ALL_CLIENT_TYPES } from "@/utils/constant/client";
import { Note } from "@/types/note";

export type ClientStatusKey = keyof typeof ClientStatus; // "ACTIVE" | "INACTIVE" | "PROSPECT"
export type ClientFilterStatus = ClientStatusKey | typeof ALL_CLIENT_STATUS; //"ALL_STATUS" | "ACTIVE" | "INACTIVE" | "PROSPECT"

export type ClientTypeKey = keyof typeof ClientType; // "INDIVIDUAL" | "CORPORATE" | "GOVERNMENT" | "NON_PROFIT"
export type ClientFilterType = ClientTypeKey | typeof ALL_CLIENT_TYPES; // "ALL_CLIENT_TYPES" | "INDIVIDUAL" | "CORPORATE" | "GOVERNMENT" | "NON_PROFIT"

/** Base Client */
export interface ClientBase {
  firstName: string;
  lastName: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: ClientStatusKey;
  type: ClientTypeKey;
  description?: string;
}

// Form values (same as base)
export interface ClientFormValues extends ClientBase {
  id?: string;
}
// API input (same as base for now, could add validation metadata later)
export type CreateClientInput = ClientBase;

/** Client Entity */
export interface Client extends ClientBase {
  id: string;
  name: string; // Computed: `${firstName} ${lastName}`
  casesCount: number;
  notes: Note[];
  createdAt?: string; // Optional timestamp
  updatedAt?: string; // Optional timestamp
}

export type TableClientSortKey =
  | "id"
  | "name"
  | "email"
  | "phone"
  | "company"
  | "type"
  | "address"
  | "status";
