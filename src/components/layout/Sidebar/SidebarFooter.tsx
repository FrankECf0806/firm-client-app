import { People } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { user } from "@/test_data";
import { SidebarFooterProps } from "@/types/navbar";

export default function SidebarFooter({
  sidebarExpanded = false,
}: SidebarFooterProps) {
  return (
    <>
      {!sidebarExpanded && (
        <Box className="mt-auto px-2 py-4 flex flex-col items-center gap-1">
          <Box className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
            <People className="text-primary text-xl" />
          </Box>
          <Typography
            variant="caption"
            className="text-xs font-semibold text-center"
          >
            {user.firstName}
          </Typography>
          <Typography
            variant="caption"
            className="text-[10px] text-center text-gray-500 opacity-80"
          >
            {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
          </Typography>
        </Box>
      )}
    </>
  );
}
