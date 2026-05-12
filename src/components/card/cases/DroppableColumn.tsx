"use client";

import { Box } from "@mui/material";
import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";
import { CollisionPriority } from "@dnd-kit/abstract";

interface DroppableColumnProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function DroppableColumn({
  id,
  children,
  className,
}: DroppableColumnProps) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: ["case"],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <Box ref={ref} className={className} data-status={id}>
      {children}
    </Box>
  );
}
