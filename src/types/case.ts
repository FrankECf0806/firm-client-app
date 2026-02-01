import { ChipProps } from "@mui/material";
import { CaseStatus, CaseType } from "../enums/case";

export interface Case {
  id: string;
  title: string;
  client: string;
  clientId: string;
  status: CaseStatus;
  type: CaseType;
  openDate: string;
  nextDeadline?: string;
  description?: string;
  notes: Note[];
}

export interface Note {
  id: string;
  content: string;
  timestamp: string;
  author: string;
}

export type NewCaseFormValues = {
  caseTitle: string;
  client: string;
  caseType: string;
  priority: string;
  filingDate: string;
  deadline: string;
  description: string;
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

export type QuickFilterStatus = CaseStatus | "ALL_STATUS";
