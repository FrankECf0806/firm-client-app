"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { BaseCardProps } from "@/types/ui/card";

export function BaseCard({
  title,
  titleIcon: Icon,
  titleVariant = "h6",
  titleIconClassName = "",
  action,
  children,
  linkTo,
  tooltip,
  className = "",
  contentClassName = "",
  onClick,
}: BaseCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (linkTo) {
      router.push(linkTo);
    }
  };

  const card = (
    <Card
      className={clsx(
        "h-full rounded-lg border border-gray-200 transition-all duration-200 ease-in-out",
        (linkTo || onClick) &&
          "cursor-pointer hover:shadow-lg hover:-translate-y-0.5",
        className,
      )}
      onClick={handleClick}
    >
      <CardContent className={`${contentClassName} p-2 h-full flex flex-col`}>
        {/* Header with title and action */}
        {(title || action) && (
          <>
            <Box className="flex justify-between items-center mb-1">
              {title && (
                <Box className="flex items-center gap-1">
                  {Icon && (
                    <Icon
                      className={`text-lg text-primary ${titleIconClassName}`}
                    />
                  )}
                  <Typography
                    variant={titleVariant}
                    className="font-bold truncate max-w-full"
                  >
                    {title}
                  </Typography>
                </Box>
              )}
              {action && <Box>{action}</Box>}
            </Box>
            <Divider className="mb-3" />
          </>
        )}
        {/* Card content */}
        {children}
      </CardContent>
    </Card>
  );

  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      {card}
    </Tooltip>
  ) : (
    card
  );
}
