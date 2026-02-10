export interface Task {
  id: string;
  title: string;
  caseId: string;
  caseName: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}
