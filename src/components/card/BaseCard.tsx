"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Divider,
  CardHeader,
} from "@mui/material";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { BaseCardProps } from "@/types/ui/card";

export function BaseCard({
  cardHeaderIcons,
  cardHeaderClassName,
  title,
  titleIcon: Icon,
  titleVariant = "h6",
  titleIconClassName = "",
  action,
  children,
  linkTo,
  tooltip,
  className = "",
  style,
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
      style={style}
      onClick={handleClick}
    >
      {cardHeaderIcons && (
        <CardHeader
          action={cardHeaderIcons}
          className={`${cardHeaderClassName} gap-2`}
        />
      )}
      <CardContent className={`${contentClassName} p-2 h-full flex flex-col`}>
        {/* Header with title and action */}
        {(title || action) && (
          <>
            <Box className="flex justify-between items-start gap-2 mb-1 w-full">
              {title && (
                <Box className="flex items-center gap-1 flex-1 min-w-0">
                  {Icon && (
                    <Icon
                      className={`text-lg text-primary shrink-0 ${titleIconClassName}`}
                    />
                  )}
                  <Typography
                    variant={titleVariant}
                    className="font-bold flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {title}
                  </Typography>
                </Box>
              )}
              {action && (
                <Box className="shrink-0 flex items-start">{action}</Box>
              )}
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
