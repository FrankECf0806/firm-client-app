"use client";

import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "./Sidebar/config";
import { getActiveNavPath } from "@/utils/helper/global";
import { useCallback, useMemo } from "react";

export function MobileSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const activePath = useMemo(
    () => getActiveNavPath(pathname, navItems),
    [pathname],
  );

  const handleNavigation = useCallback(
    (path: string) => {
      if (pathname === path) return;

      router.push(path);
    },
    [pathname, router],
  );

  return (
    <Box
      className="
        fixed bottom-0 left-0 right-0 z-50
        flex justify-around items-center
        bg-white border-t border-primary/15 shadow-lg py-2
        touch-action-manipulation
      "
    >
      {navItems.map((item) => {
        const active = activePath === item.path;
        const Icon = item.icon;

        return (
          <Box
            key={item.path}
            role="button"
            tabIndex={0}
            aria-label={item.label}
            onClick={() => handleNavigation(item.path)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNavigation(item.path);
              }
            }}
            className={`
              w-10 h-10
              flex items-center justify-center
              rounded-lg
              cursor-pointer
              select-none
              transition-colors
              touch-action-manipulation
              ${active ? "bg-primary text-white" : "text-primary"}
            `}
          >
            <Icon />
          </Box>
        );
      })}
    </Box>
  );
}
