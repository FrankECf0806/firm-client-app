export enum CasePracticeArea {
  CIVIL_LITIGATION = "Civil Litigation",
  CORPORATE = "Corporate Law",
  CRIMINAL_DEFENSE = "Criminal Defense",
  ESTATE_PLANNING = "Estate Planning",
  FAMILY_LAW = "Family Law",
  INMIGRATION = "Immigration",
  INTELLECTUAL_PROPERTY = "Intellectual Property",
  REAL_ESTATE = "Real Estate",
}

export enum CaseStatus {
  ACTIVE = "Active",
  PENDING = "Pending",
  CLOSED = "Closed",
  ARCHIVED = "Archived",
}

export enum CasePriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  URGENT = "Urgent",
}

export type SortKey =
  | "id"
  | "title"
  | "client"
  | "practiceArea"
  | "openedAt"
  | "status";
