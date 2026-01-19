export interface Meeting {
  id: string;
  caseId: string;
  date: string;
  type: "call" | "meeting" | "email" | "hearing";
  summary: string;
  duration: string;
}
