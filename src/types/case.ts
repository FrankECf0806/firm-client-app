import { ChipProps } from "@mui/material";
import {
  CasePriority,
  CaseStatus,
  CasePracticeArea,
  SortKey,
} from "@/enums/case";
import { ALL_CASE_STATUS } from "@/utils/constant/case";

// Types for enum keys
export type CaseStatusKey = keyof typeof CaseStatus; // "ACTIVE" | "PENDING" | "CLOSED" | "ARCHIVED"
export type CasePracticeAreaKey = keyof typeof CasePracticeArea; // "CIVIL_LITIGATION" | "CORPORATE" | ...
export type CasePriorityKey = keyof typeof CasePriority; // "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export interface Case {
  id: string;
  title: string;
  client: string;
  clientId: string;
  status: CaseStatusKey;
  practiceArea: CasePracticeAreaKey;
  priority: CasePriorityKey;
  openedAt: string;
  nextDeadline?: string;
  description?: string;
  notes: Note[];
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  author: string;
}

export type CaseFormValues = {
  title: string;
  client: string;
  practiceArea: CasePracticeAreaKey;
  priority: CasePriorityKey;
  openedAt: string;
  nextDeadline: string;
  description?: string;
};

export type CaseTypeItem = {
  label: string;
  selectedClass: string;
  unselectedClass: string;
  onClick: (setType: (value: string) => void) => void;
};

export type CaseStatusItem = {
  label: string;
  color: ChipProps["color"];
  onClick: (setStatus: (value: string) => void) => void;
};

export type CaseFilterStatus = CaseStatusKey | typeof ALL_CASE_STATUS;
export type CaseFilterPracticeArea = CasePracticeAreaKey;

// Case Table
export interface CaseColumnTable {
  field: string;
  label: string;
  minWidth?: number;
  sortable?: boolean;
  sortKey?: SortKey;
  align?: "left" | "right" | "center";
}

export type SortOrder = "asc" | "desc";
