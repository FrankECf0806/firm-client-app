"use client";
import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { Box } from "@mui/material";

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:block">
        <Sidebar
          sidebarExpanded={sidebarExpanded}
          onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        />
      </aside>

      <main className="flex-1 flex flex-col">
        <Header />
        <Box
          className="
			flex-1
			p-2 md:p-4
			bg-primary-light/10 dark:bg-primary-dark/10
			items-center justify-center
			w-full overflow-x-hidden"
          sx={{ maxWidth: "100%" }}
        >
          {children}
        </Box>
      </main>
      <div className="block lg:hidden">
        <MobileSidebar />
      </div>
    </div>
  );
}
