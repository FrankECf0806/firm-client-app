import { SidebarNavProps } from "@/types/navbar";
import SidebarNavItem from "./SidebarNavItem";
import { Box } from "@mui/material";

export default function SidebarNav({
  items,
  expanded,
  isActive,
}: SidebarNavProps) {
  return (
    <Box className="mt-8 space-y-0.5 m-0.5">
      {items.map((item) => (
        <SidebarNavItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          path={item.path}
          active={isActive(item.path)}
          expanded={expanded}
        />
      ))}
    </Box>
  );
}
