import { Balance, ChevronLeft, Menu } from "@mui/icons-material";
import { Box, IconButton, Link, Typography } from "@mui/material";
import { SidebarProps } from "@/types/navbar";

export default function SidebarHeader({
  sidebarExpanded = false,
  onToggleSidebar,
}: SidebarProps) {
  return (
    <>
      <Box className="flex items-center justify-between px-2">
        {sidebarExpanded && (
          <Link
            href="/dashboard"
            className="flex items-center gap-2 no-underline text-inherit flex-1 min-w-0"
          >
            <Balance className="text-4xl min-w-10" fontSize="inherit" />
            <Box className="flex flex-col min-w-0 leading-none">
              <Typography
                noWrap
                className="font-semibold leading-tight tracking-tight"
              >
                SoloLawyer Legal
              </Typography>
              <Typography
                variant="caption"
                noWrap
                className="text-sm font-medium opacity-75 leading-tight text-gray-600"
              >
                Process Manager
              </Typography>
            </Box>
          </Link>
        )}

        <IconButton
          color="primary"
          onClick={onToggleSidebar}
          className={`
                        min-w-10 w-10 h-10 p-0.5
                        ${sidebarExpanded ? "ml-auto mr-1.5" : "mx-auto"}
                        text-4xl
                        hover:bg-primary/10
                    `}
        >
          {sidebarExpanded ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Box>
    </>
  );
}
