import { Box } from "@mui/material";
import { Header } from "./Header";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex min-h-screen w-full">
      {/* <Sidebar /> */}
      <Box className="flex flex-col flex-1 min-w-0">
        <Header />
        <Box component="main" className="flex-1 p-3 overflow-auto bg-primary/5">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
