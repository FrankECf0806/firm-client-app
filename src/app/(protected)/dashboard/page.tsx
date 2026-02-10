import { Box } from "@mui/material";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Metric } from "@/components/dashboard/Metric";

export default function Dashboard() {
  return (
    <Box>
      <QuickActions />
      <Metric />
    </Box>
  );
}
