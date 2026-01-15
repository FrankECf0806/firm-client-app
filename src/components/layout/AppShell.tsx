"use client";
import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:block">
        <Sidebar
          sidebarExpanded={sidebarExpanded}
          onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        />
      </aside>

      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-2">{children}</div>
      </main>
      <div className="block md:hidden">
        <MobileSidebar />
      </div>
    </div>
  );
}
