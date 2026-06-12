"use client";

import { Box, Typography, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { SidebarNavItemProps } from "@/types/navbar";
import { useEffect, useState } from "react";

export default function SidebarNavItem({
  icon,
  label,
  path,
  expanded,
  active: isActive,
}: SidebarNavItemProps) {
  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const base =
    "rounded-xl cursor-pointer transition-all duration-200 no-underline text-inherit";
  const stateStyle = active
    ? "bg-primary text-white hover:bg-primary-dark"
    : "hover:bg-primary/10 hover:translate-x-0.5";

  const handleClick = () => {
    router.push(path);
  };

  const content = (
    <Box
      onClick={handleClick}
      className={`
		flex items-center gap-2 px-2 py-2 ${base} ${stateStyle}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <Box className="min-w-8 w-8 h-8 flex items-center justify-center">
        {icon}
      </Box>
      {expanded && (
        <Typography
          variant="body1"
          noWrap
          className={`tracking-tight ${active ? "text-white" : "text-gray-800"}`}
        >
          {label}
        </Typography>
      )}
    </Box>
  );

  if (expanded) return content;
  return (
    <Tooltip title={label} placement="right" arrow>
      {content}
    </Tooltip>
  );
}
