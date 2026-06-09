import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useDraggable } from "@dnd-kit/react";
import { Case } from "@/types/case";
import { BaseCard } from "@/components/card/BaseCard";
import {
  CASE_PRIORITY_CONFIG,
  CASE_STATUS_CONFIG,
  CASE_TYPE_CONFIG,
} from "@/utils/constant/case";
import { CalendarToday } from "@mui/icons-material";
import { useHelperFunctions } from "@/utils/helper/global";

interface CaseCardProps {
  caseItem: Case & { clientName: string };
}

function shallowEqualCase(
  a: Case & { clientName: string },
  b: Case & { clientName: string },
): boolean {
  if (Object.is(a, b)) return true;

  if (!a || !b) return false;

  // We explicitly compare only enumerable runtime fields
  const aKeys = Object.keys(a) as (keyof typeof a)[];
  const bKeys = Object.keys(b) as (keyof typeof b)[];

  if (aKeys.length !== bKeys.length) return false;

  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];

    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;

    if (!Object.is(a[key], b[key])) return false;
  }

  return true;
}

function CaseCardComponent({ caseItem }: CaseCardProps) {
  const { getThemeColor } = useHelperFunctions();
  const now = new Date().getTime();

  const deadlineTimestamp = caseItem.nextDeadline
    ? new Date(caseItem.nextDeadline).getTime()
    : now;

  const daysUntil = Math.ceil((deadlineTimestamp - now) / 86400000);
  const deadlineLabel =
    daysUntil < 0
      ? `${Math.abs(daysUntil)}d overdue`
      : daysUntil === 0
        ? "Today"
        : `${daysUntil}d`;

  const priorityConfig = CASE_PRIORITY_CONFIG[caseItem.priority];
  const statusConfig = CASE_STATUS_CONFIG[caseItem.status];
  const typeConfig = CASE_TYPE_CONFIG[caseItem.practiceArea];

  const priorityColor = getThemeColor(priorityConfig?.styling?.color);
  const statusColor = getThemeColor(statusConfig?.styling?.color);

  const { ref, isDragging } = useDraggable({
    id: caseItem.id,
    type: "case",
    data: caseItem,
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <Box ref={ref} style={style} className="mb-3">
      <BaseCard
        className="
          border-l-3
          transition-all duration-200
          hover:border-blue-400! hover:shadow-lg hover:-translate-y-0.5
        "
        contentClassName="p-3 !pb-3"
        linkTo={`/cases/${caseItem.id}`}
      >
        <Typography
          variant="body2"
          className="font-semibold text-sm mb-0.5 text-gray-800 truncate"
        >
          {caseItem.title}
        </Typography>

        <Typography
          variant="body2"
          className="text-xs text-gray-500 mb-2 truncate"
        >
          {caseItem.clientName}
        </Typography>

        {/* First row */}
        <Box className="flex flex-wrap items-center gap-2 mb-2">
          <Box
            component="span"
            className={`
              ${typeConfig?.styling?.unselectedClass}
              inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
            `}
          >
            {typeConfig.label}
          </Box>

          <Box className="flex items-center gap-1 ml-auto">
            <CalendarToday
              className="text-[14px]"
              style={{
                color:
                  daysUntil < 0
                    ? getThemeColor("error")
                    : getThemeColor("success"),
              }}
            />
            <Box
              component="span"
              className="text-xs"
              style={{
                color:
                  daysUntil < 0
                    ? getThemeColor("error")
                    : getThemeColor("success"),
              }}
            >
              {deadlineLabel}
            </Box>
          </Box>
        </Box>

        <Box className="flex items-center gap-1.5 mt-2">
          <span
            className="
              inline-flex items-center border px-2 py-0.5 rounded text-xs font-medium capitalize
            "
            style={{
              color: statusColor,
              backgroundColor: statusColor + "20",
              borderColor: `${statusColor}40`,
            }}
          >
            {statusConfig.label}
          </span>

          {caseItem.priority && (
            <span
              className="px-2 py-0.5 border rounded text-xs font-semibold min-w-1.5 text-center"
              style={{
                color: priorityColor,
                backgroundColor: priorityColor + "20",
                borderColor: `${priorityColor}40`,
              }}
            >
              {priorityConfig.label}
            </span>
          )}
        </Box>
      </BaseCard>
    </Box>
  );
}

export const CaseCard = memo(CaseCardComponent, (prev, next) =>
  shallowEqualCase(prev.caseItem, next.caseItem),
);
