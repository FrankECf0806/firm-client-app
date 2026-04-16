import { TaskPriority, TaskStatus } from "@/enums/task";
import { ConfigItem } from "@/types/ui";
import { TaskPriorityFilter, TaskStatusFilter } from "@/types/task";

// TASK PRIORITY CONFIG
export const ALL_TASK_PRIORITIES = "ALL_PRIORITIES";

export const QUICK_FILTER_TASK_PRIORITY_KEYS: TaskPriorityFilter[] = [
  ALL_TASK_PRIORITIES,
  TaskPriority.URGENT,
  TaskPriority.HIGH,
] as const;

export const TASK_PRIORITY_CONFIG: Record<
  TaskPriorityFilter,
  ConfigItem<TaskPriorityFilter>
> = {
  [ALL_TASK_PRIORITIES]: {
    label: "All Priorities",
    styling: {
      color: "primary",
      selectedClass: "bg-primary-600 text-white",
      unselectedClass:
        "bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100",
    },
    onClick: (setPriority) => setPriority(ALL_TASK_PRIORITIES),
  },
  ["LOW"]: {
    label: "Low",
    styling: {
      selectedClass: "bg-green-600 text-white",
      unselectedClass:
        "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
    },
    onClick: (setPriority) => setPriority("LOW"),
  },
  ["MEDIUM"]: {
    label: "Medium",
    styling: {
      selectedClass: "bg-yellow-600 text-white",
      unselectedClass:
        "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100",
    },
    onClick: (setPriority) => setPriority("MEDIUM"),
  },
  ["HIGH"]: {
    label: "High",
    styling: {
      selectedClass: "bg-red-600 text-white",
      unselectedClass:
        "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
    },
    onClick: (setPriority) => setPriority("HIGH"),
  },
  ["URGENT"]: {
    label: "Urgent",
    styling: {
      selectedClass: "bg-orange-600 text-white",
      unselectedClass:
        "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100",
    },
    onClick: (setPriority) => setPriority("URGENT"),
  },
};

// TASK STATUS CONFIG
export const ALL_TASK_STATUSES = "ALL_STATUSES";

export const TASK_STATUS_CONFIG: Record<
  TaskStatusFilter,
  ConfigItem<TaskStatusFilter>
> = {
  [ALL_TASK_STATUSES]: {
    label: "All Statuses",
    styling: {
      color: "primary",
    },
    onClick: (setStatus) => setStatus(ALL_TASK_STATUSES),
  },
  ["TODO"]: {
    label: "To Do",
    styling: {
      selectedClass: "bg-gray-600 text-white",
      unselectedClass:
        "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100",
    },
    onClick: (setStatus) => setStatus("TODO"),
  },
  ["IN_PROGRESS"]: {
    label: "In Progress",
    styling: {
      selectedClass: "bg-blue-600 text-white",
      unselectedClass:
        "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100",
    },
    onClick: (setStatus) => setStatus("IN_PROGRESS"),
  },
  ["IN_REVIEW"]: {
    label: "In Review",
    styling: {
      selectedClass: "bg-purple-600 text-white",
      unselectedClass:
        "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100",
    },
    onClick: (setStatus) => setStatus("IN_REVIEW"),
  },
  ["DONE"]: {
    label: "Done",
    styling: {
      selectedClass: "bg-green-600 text-white",
      unselectedClass:
        "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
    },
    onClick: (setStatus) => setStatus("DONE"),
  },
  ["BLOCKED"]: {
    label: "Blocked",
    styling: {
      selectedClass: "bg-red-600 text-white",
      unselectedClass:
        "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
    },
    onClick: (setStatus) => setStatus("BLOCKED"),
  },
  ["DEFERRED"]: {
    label: "Deferred",
    styling: {
      selectedClass: "bg-amber-600 text-white",
      unselectedClass:
        "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100",
    },
    onClick: (setStatus) => setStatus("DEFERRED"),
  },
};

// Quick filter presets (similar to CLIENT patterns)
export const QUICK_FILTER_TASK_STATUS_KEYS: TaskStatusFilter[] = [
  ALL_TASK_STATUSES,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
] as const;

export const QUICK_FILTER_TASK_STATUS = Object.entries(
  TASK_STATUS_CONFIG,
).filter(([key]) =>
  QUICK_FILTER_TASK_STATUS_KEYS.includes(key as TaskStatusFilter),
);

// Overview page presets (similar to CLIENT patterns)
export const OVERVIEW_FILTER_TASK_STATUS_KEYS: TaskStatusFilter[] = [
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
] as const;

export const OVERVIEW_FILTER_TASK_STATUS = Object.entries(
  TASK_STATUS_CONFIG,
).filter(([key]) =>
  OVERVIEW_FILTER_TASK_STATUS_KEYS.includes(key as TaskStatusFilter),
);
