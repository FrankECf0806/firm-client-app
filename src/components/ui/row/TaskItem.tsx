import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { formatDate } from "@/utils/date";
import { ListRow } from "@/components/ui/list/ListRow";
import {
  TASK_PRIORITY_CONFIG,
  TASK_STATUS_CONFIG,
} from "@/utils/constant/task";
import { TaskItemProps } from "@/types/task";
import { TaskStatus } from "@/enums/task";
import { OverviewChip } from "@/components/ui/chip/OverviewChip";

export function TaskItem({ title, dueDate, priority, status }: TaskItemProps) {
  const dateDisplay = dueDate ? formatDate(dueDate) : "No due date";
  const isCompleted = status === TaskStatus.DONE;

  // Status-based styling
  const statusConfig = TASK_STATUS_CONFIG[status];
  const statusBgColor =
    statusConfig?.styling?.unselectedClass?.split(" ")[0] || "bg-gray-50";

  const icon = isCompleted ? CheckCircleIcon : CancelIcon;
  const iconBgColor = isCompleted ? "bg-green-50" : statusBgColor;
  const iconColor = isCompleted ? "text-green-500" : "text-gray-500";

  // Priority config
  const priorityConfig = TASK_PRIORITY_CONFIG[priority];
  const priorityLabel = priorityConfig?.label || priority;
  const priorityClass = !isCompleted
    ? priorityConfig?.styling?.unselectedClass
    : "bg-gray-100 text-gray-700";

  return (
    <ListRow
      icon={icon}
      title={title}
      subtitle={dueDate ? `Due: ${dateDisplay}` : undefined}
      meta={dueDate ? undefined : "No due date"}
      badge={<OverviewChip label={priorityLabel} className={priorityClass} />}
      iconBgColor={iconBgColor}
      iconColor={iconColor}
      className={isCompleted ? "opacity-50" : ""}
    />
  );
}
