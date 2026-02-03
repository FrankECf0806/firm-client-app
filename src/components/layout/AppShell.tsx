"use client";

import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { Box } from "@mui/material";

export default function AppShell({ children }: { children: ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <Box className="flex min-h-screen w-full">
      <Box component="aside" className="hidden lg:block shrink-0">
        <Sidebar
          sidebarExpanded={sidebarExpanded}
          onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        />
      </Box>

      <Box className="flex flex-1 flex-col min-w-0">
        <Header />

        {/* Main content area */}
        <Box
          component="main"
          className="
            flex-1
            p-2 md:p-4
            bg-primary-light/10 dark:bg-primary-dark/10
            min-w-0
            overflow-y-auto
          "
        >
          {children}
        </Box>
      </Box>

      <div className="block lg:hidden">
        <MobileSidebar />
      </div>
    </Box>
  );
}
