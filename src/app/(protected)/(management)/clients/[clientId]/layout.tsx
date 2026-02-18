"use client";

import { ReactNode, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Tab, Tabs, Card, CardContent, CardHeader } from "@mui/material";
import { useAppContext } from "@/providers/AppProvider";
import Management from "@/components/layout/Management";
import { rootSourcePath } from "@/utils/constant";
import {
  CLIENT_STATUS_CONFIG,
  CLIENT_TYPE_CONFIG,
} from "@/utils/constant/client";
import { MetaDataItem } from "@/types/layout";

export default function ClientDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const clientId = params.clientId as string;
  const router = useRouter();

  const { clients } = useAppContext();
  const { getClientById } = clients;

  // Determine current tab from pathname
  const getCurrentTab = () => {
    if (pathname.endsWith("/cases")) return 1;
    if (pathname.endsWith("/invoices")) return 2;
    if (pathname.endsWith("/documents")) return 3;
    if (pathname.endsWith("/communications")) return 4;
    return 0; // overview
  };

  const [tabValue, setTabValue] = useState(getCurrentTab());

  const client = getClientById(clientId);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    const basePath = `/clients/${clientId}`;
    const paths = ["", "cases", "invoices", "documents", "communications"];
    router.push(`${basePath}/${paths[newValue]}`);
  };

  if (!client) {
    return (
      <Management
        title=""
        breadcrumbs={[
          { ...rootSourcePath },
          { label: "Clients", href: "/clients" },
        ]}
      >
        <Card
          className="
            p-2 text-center shadow-lg 
            h-full
            rounded-lg mb-20 mt-10"
        >
          <CardHeader
            title="Client Not Found"
            subheader="The client you are looking for does not exist."
          />
          <CardContent className="mt-2 sm:mt-4 pb-20 mb-32">
            <Link href="/clients" className="text-primary hover:underline">
              Back to Clients List
            </Link>
          </CardContent>
        </Card>
      </Management>
    );
  }

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Clients", href: "/clients" },
    {
      label: `${client.firstName} ${client.lastName}`,
      href: undefined,
    },
  ];

  const metadata: MetaDataItem[] = [
    {
      label: `${CLIENT_STATUS_CONFIG[client.status].label}`,
      color: `${CLIENT_STATUS_CONFIG[client.status].styling?.color ?? "default"}`,
      size: "small",
    },
    {
      label: `${CLIENT_TYPE_CONFIG[client.type].label}`,
      className: `${CLIENT_TYPE_CONFIG[client.type].styling?.unselectedClass ?? "default"}`,
      size: "small",
      icon: CLIENT_TYPE_CONFIG[client.type].styling?.icon ?? undefined,
    },
  ];

  return (
    <Management
      title={`${client.firstName} ${client.lastName}`}
      subtitle={client.company}
      breadcrumbs={breadcrumbs}
      metadata={metadata}
      metadataPosition="inline"
    >
      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab
            label="Overview"
            component={Link}
            href={`/clients/${clientId}`}
          />
          <Tab
            label="Cases"
            component={Link}
            href={`/clients/${clientId}/cases`}
          />
          <Tab
            label="Invoices"
            component={Link}
            href={`/clients/${clientId}/invoices`}
          />
          <Tab
            label="Documents"
            component={Link}
            href={`/clients/${clientId}/documents`}
          />
          <Tab
            label="Communications"
            component={Link}
            href={`/clients/${clientId}/communications`}
          />
        </Tabs>
      </Box>

      {/* Page Content */}
      {children}
    </Management>
  );
}
