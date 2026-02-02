"use client";

import { ReactNode } from "react";
import Management from "@/components/layout/Management";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import { defaultSourcePath, pageConfig } from "@/utils/constant";

export default function ManagementLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const isDetailPage = pathname.split("/").filter(Boolean).length > 2;

  if (isDetailPage) {
    return <Box className="p-4">{children}</Box>;
  }

  const config = pageConfig[pathname] || {
    title: pathname.split("/").pop()?.replace("-", " ") || "Page",
  };

  return (
    <Management
      title={config.title}
      subtitle={config.subtitle}
      breadcrumbs={[
        { ...defaultSourcePath },
        { label: config.title, href: undefined },
      ]}
    >
      {children}
    </Management>
  );
}
