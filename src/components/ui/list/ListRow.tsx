import { Avatar, Box, Grid, Typography } from "@mui/material";
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
  const titleString = typeof title === "string" ? title : undefined;

  return (
    <Box
      className={`w-full ${
        highlight ? "bg-blue-50/50 rounded" : ""
      } ${onClick ? "cursor-pointer hover:bg-gray-50" : ""} ${className}`}
      onClick={onClick}
    >
      <Grid container spacing={1.5} alignItems="center" className="w-full">
        {/* Left element: either Avatar or Icon */}
        <Grid size="auto">
          {avatar ? (
            <Avatar className="bg-primary/10 text-primary w-6 h-6 text-xs">
              {avatar}
            </Avatar>
          ) : Icon ? (
            <Box
              className={`w-5 h-5 rounded-full flex items-center justify-center ${iconBgColor}`}
            >
              <Icon className={`${iconColor} text-xs`} />
            </Box>
          ) : null}
        </Grid>

        {/* Main content - takes remaining space */}
        <Grid size="grow" className="min-w-0">
          <Typography
            component="div"
            className="text-xs font-medium truncate text-gray-900"
            title={titleString}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              component="div"
              className="text-[11px] text-gray-500 truncate"
            >
              {subtitle}
            </Typography>
          )}
        </Grid>

        {/* Meta text (if any) */}
        {meta && (
          <Grid size="auto">
            <Typography className="text-[10px] text-gray-400 whitespace-nowrap">
              {meta}
            </Typography>
          </Grid>
        )}

        {/* Badge */}
        {badge && (
          <Grid size="auto" className="flex items-center">
            {badge}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
