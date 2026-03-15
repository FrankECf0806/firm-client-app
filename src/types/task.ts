import { TaskPriority, TaskStatus } from "@/enums/task";
import { ALL_TASK_PRIORITIES, ALL_TASK_STATUSES } from "@/utils/constant/task";

export type TaskPriorityKey = keyof typeof TaskPriority; // "LOW" | "MEDIUM" | "HIGH" | "URGENT"
export type TaskPriorityFilter = TaskPriorityKey | typeof ALL_TASK_PRIORITIES; // "ALL_PRIORITIES" | "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export type TaskStatusKey = keyof typeof TaskStatus; // "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | "BLOCKED" | "DEFERRED"
export type TaskStatusFilter = TaskStatusKey | typeof ALL_TASK_STATUSES; // "ALL_STATUS" | "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | "BLOCKED" | "DEFERRED"

/** Base Task - shared fields for forms and creation */
export interface TaskBase {
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriorityKey;
  caseId?: string;
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
  createdAt: string;
  updatedAt?: string;
}

export interface TaskItemProps {
  title: string;
  dueDate?: string;
  priority: TaskPriorityKey;
  status: TaskStatusKey;
}
