// src/app/(protected)/(management)/layout.tsx
"use client";

import { ReactNode } from "react";
import Management from "@/components/layout/Management";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import { rootSourcePath, pageConfig } from "@/utils/constant";

// All list pages are exactly the keys in pageConfig
const listPaths = Object.keys(pageConfig);

export default function ManagementLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  // Check if current path is exactly a list page
  const isListPage = listPaths.includes(pathname);

  if (!isListPage) {
    // Detail page or nested route – just render children with padding
    return <Box>{children}</Box>;
  }

  // List page – use Management component with pageConfig
  const config = pageConfig[pathname];

  return (
    <Management
      title={config.title}
      subtitle={config.subtitle}
      breadcrumbs={[
        { ...rootSourcePath },
        { label: config.title, href: undefined },
      ]}
    >
      {children}
    </Management>
  );
}
