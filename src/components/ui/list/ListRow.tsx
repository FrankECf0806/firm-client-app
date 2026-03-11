import { Avatar, Box, Typography } from "@mui/material";
import { ElementType, ReactNode } from "react";

interface ListRowProps {
  icon?: ElementType;
  avatar?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  badge?: ReactNode;
  highlight?: boolean;
  onClick?: () => void;
  className?: string;
  iconBgColor?: string;
  iconColor?: string;
}

export function ListRow({
  icon: Icon,
  avatar,
  title,
  subtitle,
  meta,
  badge,
  highlight,
  onClick,
  className = "",
  iconBgColor = "bg-blue-50",
  iconColor = "text-blue-500",
}: ListRowProps) {
  return (
    <Box
      className={`flex items-start gap-2 py-2 ${
        highlight ? "bg-blue-50/50 -mx-2 px-2 rounded" : ""
      } ${onClick ? "cursor-pointer hover:bg-gray-50" : ""} ${className}`}
      onClick={onClick}
    >
      {/* Left element: either Avatar or Icon */}
      {avatar ? (
        <Avatar className="bg-primary/10 text-primary w-6 h-6 text-xs shrink-0">
          {avatar}
        </Avatar>
      ) : Icon ? (
        <Box className={`p-1 rounded ${iconBgColor} shrink-0`}>
          <Icon className={`${iconColor} text-xs`} />
        </Box>
      ) : null}

      {/* Main content */}
      <Box className="flex-1 min-w-0">
        <Typography className="text-xs font-medium truncate text-gray-900">
          {title}
        </Typography>
        {subtitle && (
          <Typography className="text-[11px] text-gray-600 truncate">
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Right side: meta and badge */}
      <Box className="flex items-center gap-2 shrink-0">
        {meta && (
          <Typography className="text-[10px] text-gray-400 whitespace-nowrap">
            {meta}
          </Typography>
        )}
        {badge}
      </Box>
    </Box>
  );
}
