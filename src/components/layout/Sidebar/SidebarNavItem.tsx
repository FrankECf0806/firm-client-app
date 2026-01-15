import { SidebarNavItemProps } from "@/types/navbar";
import { Box, Typography, Tooltip } from "@mui/material";
import Link from "next/link";

export default function SidebarNavItem({
  icon,
  label,
  path,
  active,
  expanded,
}: SidebarNavItemProps) {
  const base =
    "rounded-xl cursor-pointer transition-all duration-200 no-underline text-inherit";

  const stateStyle = active
    ? "bg-primary text-white hover:bg-primary-dark"
    : "hover:bg-primary/10 hover:translate-x-0.5";

  /* Expanded = normal layout */
  if (expanded) {
    return (
      <Link href={path} className="block">
        <Box
          className={`flex items-center gap-2 px-2 py-2 ${base} ${stateStyle}`}
        >
          <Box className="min-w-8 w-8 h-8 flex items-center justify-center">
            {icon}
          </Box>
          <Typography
            variant="body1"
            noWrap
            className={`tracking-tight ${active ? "text-white" : "text-gray-800"}`}
          >
            {label}
          </Typography>
        </Box>
      </Link>
    );
  }

  /* Collapsed = icon only + tooltip */
  return (
    <Tooltip title={label} placement="right" arrow>
      <Link href={path} className="block">
        <Box
          className={`
                        flex items-center justify-center p-2
                        ${base} ${stateStyle}
                    `}
        >
          <Box className="min-w-8 w-8 h-8 flex items-center justify-center">
            {icon}
          </Box>
        </Box>
      </Link>
    </Tooltip>
  );
}
