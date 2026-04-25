"use client";

import { ReactNode } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { CalendarMonthRounded } from "@mui/icons-material";
import { useAppContext } from "@/providers/AppProvider";
import Management from "@/components/layout/Management";
import { rootSourcePath } from "@/utils/constant";
import {
  CASE_PRIORITY_CONFIG,
  CASE_STATUS_CONFIG,
  CASE_TYPE_CONFIG,
} from "@/utils/constant/case";
import { MetaDataItem } from "@/types/layout";
import { TabApp } from "@/components/ui/tab/TabApp";
import { TabItem } from "@/types/ui/tab";
import { formatDate } from "@/utils/date";

export default function CaseDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams();
  const caseId = params.caseId as string;

  const { cases } = useAppContext();
  const { getCaseById } = cases;

  const caseItem = getCaseById(caseId);

  if (!caseItem) {
    return (
      <Management
        title=""
        breadcrumbs={[
          { ...rootSourcePath },
          { label: "Cases", href: "/cases" },
        ]}
      >
        <Card
          className="
            p-2 text-center shadow-lg 
            h-full
            rounded-lg mb-20 mt-10"
        >
          <CardHeader
            title="Case Not Found"
            subheader="The case you are looking for does not exist."
          />
          <CardContent className="mt-2 sm:mt-4">
            <Link href="/cases" className="text-primary hover:underline">
              Back to Cases List
            </Link>
          </CardContent>
        </Card>
      </Management>
    );
  }

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Cases", href: "/cases" },
    { label: caseItem.title, href: undefined },
  ];

  const metadata: MetaDataItem[] = [
    {
      label: CASE_STATUS_CONFIG[caseItem.status].label,
      color: CASE_STATUS_CONFIG[caseItem.status].styling?.color,
      size: "small",
    },
    {
      label: CASE_TYPE_CONFIG[caseItem.practiceArea].label,
      className:
        CASE_TYPE_CONFIG[caseItem.practiceArea].styling?.unselectedClass,
      size: "small",
    },
    {
      label: CASE_PRIORITY_CONFIG[caseItem.priority].label,
      color: CASE_PRIORITY_CONFIG[caseItem.priority].styling?.color,
      size: "small",
    },
  ];

  const tabs: TabItem[] = [
    { label: "Overview", path: "" },
    { label: "Tasks", path: "/tasks" },
    { label: "Documents", path: "/documents" },
  ];

  const subtitle = (
    <Box className="flex items-center gap-1">
      <CalendarMonthRounded className="text-base text-gray-500" />
      <Typography variant="body2" className="text-gray-400 truncate">
        Opened {formatDate(caseItem.createdAt)}
      </Typography>
    </Box>
  );

  return (
    <Management
      title={caseItem.title}
      subtitle={subtitle}
      breadcrumbs={breadcrumbs}
      metadata={metadata}
      metadataPosition="inline"
    >
      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <TabApp basePath={`/cases/${caseId}`} tabs={tabs} />
      </Box>

      {/* Page Content */}
      {children}
    </Management>
  );
}
