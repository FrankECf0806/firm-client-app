import { Box, IconButton, Typography } from "@mui/material";
import { ElementType, ReactNode } from "react";

export function InfoRow({
  icon: Icon,
  children,
  href,
  onIconClick,
}: {
  icon: ElementType;
  children: ReactNode;
  href?: string;
  onIconClick?: () => void;
}) {
  return (
    <Box className="flex items-center gap-2 text-sm">
      {/* Icon */}
      {onIconClick ? (
        <IconButton
          onClick={onIconClick}
          size="small"
          disableRipple
          className="flex h-5 w-5 items-center justify-center text-gray-400 p-0 hover:text-primary"
        >
          <Icon className="h-4.5 w-4.5" />
        </IconButton>
      ) : (
        <Box className="flex h-5 w-5 items-center justify-center text-gray-400">
          <Icon className="h-4.5 w-4.5" />
        </Box>
      )}

      {/* Text */}
      {href ? (
        <Typography
          component="a"
          href={href}
          variant="body2"
          className="leading-5 no-underline text-primary hover:underline"
        >
          {children}
        </Typography>
      ) : (
        <Typography variant="subtitle2" className="leading-5 text-gray-700">
          {children}
        </Typography>
      )}
    </Box>
  );
}
