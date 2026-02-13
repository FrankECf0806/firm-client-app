export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
  DEFERRED = "DEFERRED",
}

// Optional: Display labels for UI
export const TaskPriorityLabels: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "Low",
  [TaskPriority.MEDIUM]: "Medium",
  [TaskPriority.HIGH]: "High",
  [TaskPriority.URGENT]: "Urgent",
};

export const TaskStatusLabels: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "To Do",
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.IN_REVIEW]: "In Review",
  [TaskStatus.DONE]: "Done",
  [TaskStatus.BLOCKED]: "Blocked",
  [TaskStatus.DEFERRED]: "Deferred",
};

// Optional: Colors for UI badges
export const TaskPriorityColors: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "default",
  [TaskPriority.MEDIUM]: "info",
  [TaskPriority.HIGH]: "warning",
  [TaskPriority.URGENT]: "error",
};

export const TaskStatusColors: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "default",
  [TaskStatus.IN_PROGRESS]: "info",
  [TaskStatus.IN_REVIEW]: "warning",
  [TaskStatus.DONE]: "success",
  [TaskStatus.BLOCKED]: "error",
  [TaskStatus.DEFERRED]: "secondary",
};
