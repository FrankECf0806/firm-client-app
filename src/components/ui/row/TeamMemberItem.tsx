import { Box } from "@mui/material";
import { Task as TaskIcon, Notes as NotesIcon } from "@mui/icons-material";
import { ListRow } from "@/components/ui/list/ListRow";
import { OverviewChip } from "@/components/ui/chip/OverviewChip";

interface TeamMemberItemProps {
  name: string;
  taskCount: number;
  caseActivityCount: number;
  onClick?: () => void;
}

export function TeamMemberItem({
  name,
  taskCount,
  caseActivityCount,
  onClick,
}: TeamMemberItemProps) {
  const taskChipColor =
    taskCount > 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500";
  const activityChipColor =
    caseActivityCount > 0
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-500";

  return (
    <ListRow
      avatar={name.charAt(0)}
      title={name}
      subtitle={`${taskCount} active tasks  ·  ${caseActivityCount} case activities`}
      badge={
        <Box className="flex items-center gap-1 shrink-0">
          <OverviewChip
            icon={TaskIcon}
            label={`${taskCount}`}
            size="small"
            className={taskChipColor}
          />
          <OverviewChip
            icon={NotesIcon}
            label={`${caseActivityCount}`}
            size="small"
            className={activityChipColor}
          />
        </Box>
      }
      onClick={onClick}
      iconBgColor="bg-slate-100"
      iconColor="text-slate-600"
    />
  );
}
