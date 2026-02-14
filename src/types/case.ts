import { CasePriority, CaseStatus, CasePracticeArea } from "@/enums/case";
import { ALL_CASE_STATUS } from "@/utils/constant/case";
import { Note } from "@/types/note";

// Types for enum keys
export type CaseStatusKey = keyof typeof CaseStatus; // "ACTIVE" | "PENDING" | "CLOSED" | "ARCHIVED"
export type CasePracticeAreaKey = keyof typeof CasePracticeArea; // "CIVIL_LITIGATION" | "CORPORATE" | ...
export type CasePriorityKey = keyof typeof CasePriority; // "LOW" | "MEDIUM" | "HIGH" | "URGENT"

/** Base Case - shared fields for forms and creation */
export interface CaseBase {
  title: string;
  clientId: string;
  practiceArea: CasePracticeAreaKey;
  priority: CasePriorityKey;
  status: CaseStatusKey;
  openedAt: string;
  nextDeadline?: string;
  description?: string;
}

// Form values
export interface CaseFormValues extends CaseBase {
  id?: string; // Required for edit mode, not for create
}
// Create input (same as base)
export type CreateCaseInput = CaseBase;

/** Full Case Entity - stored in AppProvider */
export interface Case extends CaseBase {
  id: string;
  notes: Note[];
  createdAt?: string; // Optional timestamp
  updatedAt?: string; // Optional timestamp
}

export type CaseFilterStatus = CaseStatusKey | typeof ALL_CASE_STATUS;
export type CaseFilterPracticeArea = CasePracticeAreaKey;

export type TableCaseSortKey =
  | "id"
  | "title"
  | "clientId"
  | "status"
  | "practiceArea"
  | "priority"
  | "openedAt"
  | "nextDeadline";
