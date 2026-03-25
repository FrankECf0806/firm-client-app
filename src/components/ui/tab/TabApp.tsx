"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tab, Tabs } from "@mui/material";
import { TabAppProps } from "@/types/ui/tab";

export function TabApp({ basePath, tabs, tabsProps }: TabAppProps) {
  const pathname = usePathname();

  const tabValue = useMemo(() => {
    const currentPath = pathname;
    const index = tabs.findIndex((tab) => {
      const fullPath = basePath ? `${basePath}${tab.path}` : tab.path;
      const normalizedCurrent = currentPath.replace(/\/$/, "");
      const normalizedFull = fullPath.replace(/\/$/, "");
      return normalizedCurrent === normalizedFull;
    });
    return index !== -1 ? index : 0;
  }, [pathname, basePath, tabs]);

  return (
    <Tabs
      value={tabValue}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      {...tabsProps}
    >
      {tabs.map((tab, index) => {
        const href = basePath ? `${basePath}${tab.path}` : tab.path;
        return (
          <Tab
            key={index}
            label={tab.label}
            disabled={tab.disabled}
            component={Link}
            href={href}
          />
        );
      })}
    </Tabs>
  );
}
