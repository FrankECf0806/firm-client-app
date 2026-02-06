import { ClientStatus, ClientType } from "@/enums/client";
import { ALL_CLIENT_STATUS, ALL_CLIENT_TYPES } from "@/utils/constant/client";
import { Note } from "@/types/note";

export type ClientStatusKey = keyof typeof ClientStatus; // "ACTIVE" | "INACTIVE" | "PROSPECT"
export type ClientFilterStatus = ClientStatusKey | typeof ALL_CLIENT_STATUS; //"ALL_STATUS" | "ACTIVE" | "INACTIVE" | "PROSPECT"

export type ClientTypeKey = keyof typeof ClientType; // "INDIVIDUAL" | "CORPORATE" | "GOVERNMENT" | "NON_PROFIT"
export type ClientFilterType = ClientTypeKey | typeof ALL_CLIENT_TYPES; // "ALL_CLIENT_TYPES" | "INDIVIDUAL" | "CORPORATE" | "GOVERNMENT" | "NON_PROFIT"

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  casesCount: number;
  status: ClientStatusKey;
  type: ClientTypeKey;
  description: string;
  notes: Note[];
}

export type ClientFormValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: ClientStatusKey;
  type: ClientTypeKey;
  description: string;
};

export type TableClientSortKey =
  | "id"
  | "name"
  | "email"
  | "phone"
  | "company"
  | "type"
  | "address"
  | "status";
