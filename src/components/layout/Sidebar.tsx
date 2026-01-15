import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import SidebarHeader from "./Sidebar/SidebarHeader";
import SidebarNav from "./Sidebar/SidebarNav";
import SidebarFooter from "./Sidebar/SidebarFooter";
import { SidebarProps } from "@/types/navbar";
import { navItems } from "./Sidebar/config";

export function Sidebar({
  sidebarExpanded = false,
  onToggleSidebar,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname?.startsWith(`${path}/`);

  return (
    <Box
      className={`
                text-primary border-r border-primary/15 bg-white
                flex flex-col h-screen shadow-lg 
                transition-all duration-300
                px-1 py-4
                sticky top-0
                ${sidebarExpanded ? "w-65" : "w-15"}
            `}
    >
      <SidebarHeader
        sidebarExpanded={sidebarExpanded}
        onToggleSidebar={onToggleSidebar}
      />

      <SidebarNav
        items={navItems}
        expanded={sidebarExpanded}
        isActive={isActive}
      />

      <SidebarFooter sidebarExpanded={sidebarExpanded} />
    </Box>
  );
}
