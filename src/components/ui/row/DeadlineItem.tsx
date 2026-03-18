import { Box } from "@mui/material";
import {
  Event as EventIcon,
  Assignment as TaskIcon,
} from "@mui/icons-material";
import { formatDate } from "@/utils/date";
import { ListRow } from "@/components/ui/list/ListRow";
import { OverviewChip } from "@/components/ui/chip/OverviewChip";

interface DeadlineItemProps {
  title: string;
  dueDate: string;
  type: "case" | "task";
  priority?: string;
}

// Simple priority color mapping
const priorityColors: Record<string, string> = {
  URGENT: "bg-red-100 text-red-700 border-red-200",
  HIGH: "bg-orange-100 text-orange-700 border-orange-200",
  MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-200",
  LOW: "bg-green-100 text-green-700 border-green-200",
};

export function DeadlineItem({
  title,
  dueDate,
  type,
  priority,
}: DeadlineItemProps) {
  const daysLeft = Math.ceil(
    (new Date(dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const isOverdue = daysLeft < 0;
  const isUrgent = daysLeft >= 0 && daysLeft <= 2;

  // Get day display text
  const getDayText = () => {
    if (isOverdue) return "Overdue";
    if (daysLeft === 0) return "Today";
    if (daysLeft === 1) return "Tomorrow";
    return `${daysLeft}d`;
  };

  // Get day color
  const getDayColor = () => {
    if (isOverdue) return "bg-red-100 text-red-700";
    if (isUrgent) return "bg-orange-100 text-orange-700";
    return "bg-gray-100 text-gray-700";
  };

  // Icon based on type
  const Icon = type === "case" ? EventIcon : TaskIcon;
  const iconBgColor = type === "case" ? "bg-blue-50" : "bg-purple-50";
  const iconColor = type === "case" ? "text-blue-500" : "text-purple-500";

  const PRIORITY_TYPE: Record<string, string> = {
    URGENT: "Urgent",
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
  };

  return (
    <ListRow
      icon={Icon}
      title={title}
      subtitle={`${type === "case" ? "Case" : "Task"} · ${formatDate(dueDate)}`}
      badge={
        <Box className="flex items-center gap-1 shrink-0">
          {priority && (
            <OverviewChip
              label={PRIORITY_TYPE[priority]}
              size="small"
              className={priorityColors[priority]}
            />
          )}
          <OverviewChip
            label={getDayText()}
            size="small"
            className={getDayColor()}
          />
        </Box>
      }
      iconBgColor={iconBgColor}
      iconColor={iconColor}
    />
  );
}
