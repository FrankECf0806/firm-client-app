import { Box, Typography, Chip, Grid } from "@mui/material";
import { BaseCard } from "./BaseCard";
import {
  WarningAmber as WarningIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { PriorityCardProps } from "@/types/ui/card";

export const PriorityCard = ({
  title,
  description,
  type,
  actionLabel = "View",
  contentClassName,
  onClick,
  linkTo,
  tooltip,
}: PriorityCardProps) => {
  const colors = {
    warning: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: <WarningIcon className="text-red-500 text-lg" />,
      text: "text-red-700",
      chipBg: "bg-red-100",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: <AccessTimeIcon className="text-blue-500 text-lg" />,
      text: "text-blue-700",
      chipBg: "bg-blue-100/30",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: <CheckCircleIcon className="text-green-500 text-lg" />,
      text: "text-green-700",
      chipBg: "bg-green-100",
    },
  };
  const style = colors[type];

  return (
    <BaseCard
      className={`${style.bg} border ${style.border}`}
      contentClassName={contentClassName}
      linkTo={linkTo}
      tooltip={tooltip}
      onClick={onClick}
    >
      <Grid container spacing={{ xs: 1, md: 2 }} alignItems="center">
        {/* Icon column - spans both rows */}
        <Grid size="auto">
          <Box className="p-1.5 rounded-full bg-white shadow-sm flex items-center justify-center">
            {style.icon}
          </Box>
        </Grid>

        {/* Content column */}
        <Grid size="grow">
          {/* Title + Chip */}
          <Grid
            container
            spacing={0.5}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid size="grow">
              <Typography className={`font-medium text-xs ${style.text}`}>
                {title}
              </Typography>
            </Grid>
            <Grid size="auto">
              <Chip
                label={actionLabel}
                size="small"
                className={`${style.chipBg} ${style.text} text-[10px] h-5 cursor-pointer font-medium`}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.();
                }}
              />
            </Grid>
          </Grid>

          {/* Description */}
          <Typography className="text-[11px] text-gray-600 -mt-0.5">
            {description}
          </Typography>
        </Grid>
      </Grid>
    </BaseCard>
  );
};
