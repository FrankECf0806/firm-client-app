import { TaskPriority, TaskStatus } from "@/enums/task";

export type TaskPriorityKey = keyof typeof TaskPriority;
export type TaskStatusKey = keyof typeof TaskStatus;

/** Base Task - shared fields for forms and creation */
export interface TaskBase {
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriorityKey;
  caseId?: string;
  caseName?: string;
  assignedTo?: string;
}

// Form values (same as base)
export type TaskFormValues = TaskBase;

// Create input (same as base)
export type CreateTaskInput = TaskBase;

/** Full Task Entity - stored in AppProvider */
export interface Task extends TaskBase {
  id: string;
  status: TaskStatusKey;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}
