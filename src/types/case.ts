export interface Case {
  id: string;
  title: string;
  client: string;
  clientId: string;
  status: "active" | "pending" | "closed";
  practiceArea: string;
  openDate: string;
  nextDeadline: string;
  description: string;
  notes: Note[];
}

export interface Note {
  id: string;
  content: string;
  timestamp: string;
  author: string;
}

export interface NewCaseFormProps {
  open: boolean;
  onClose: () => void;
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
