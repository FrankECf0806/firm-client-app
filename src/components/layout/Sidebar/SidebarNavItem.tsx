"use client";

import { SidebarNavItemProps } from "@/types/navbar";
import { Box, Typography, Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SidebarNavItem({
  icon,
  label,
  path,
  active,
  expanded,
}: SidebarNavItemProps) {
  const router = useRouter();

  const base =
    "rounded-xl cursor-pointer transition-all duration-200 no-underline text-inherit select-none";

  const stateStyle = active ? "bg-primary text-white" : "hover:bg-primary/10";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(path);
  };

  const content = (
    <Box
      onClick={handleClick}
      role="link"
      tabIndex={0}
      className={`
        flex items-center gap-2 my-1
        ${expanded ? "px-2 py-2" : "justify-center p-2"}
        ${base} ${stateStyle}
        touch-action-manipulation
      `}
    >
      <Box className="min-w-8 w-8 h-8 flex items-center justify-center">
        {icon}
      </Box>

      {expanded && (
        <Typography
          variant="body1"
          noWrap
          className={`tracking-tight ${
            active ? "text-white" : "text-gray-800"
          }`}
        >
          {label}
        </Typography>
      )}
    </Box>
  );

  if (!expanded) {
    return (
      <Tooltip title={label} placement="right" arrow>
        <Link href={path} className="no-underline">
          {content}
        </Link>
      </Tooltip>
    );
  }

  return (
    <Link href={path} className="no-underline">
      {content}
    </Link>
  );
}
