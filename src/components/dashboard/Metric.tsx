"use client";

import {
  AccessTimeRounded,
  AttachMoneyRounded,
  Folder,
  PeopleRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { DataCard } from "@/components/card/DataCard";
import { useAppContext } from "@/providers/AppProvider";
import { DataCardProps } from "@/types/ui/card";

export function Metric() {
  const { cases, clients, invoices } = useAppContext();
  const { cases: casesList } = cases;
  const { clients: clientList } = clients;
  const { invoices: invoiceList } = invoices;

  // Metrics
  const activeCases = casesList.filter((c) => c.status === "ACTIVE").length;
  const totalClients = clientList.length;
  const totalRevenue = invoiceList.reduce((sum, inv) => sum + inv.total, 0);
  const outstanding = invoiceList
    .filter((inv) => inv.status !== "PAID")
    .reduce((sum, inv) => sum + inv.total, 0);
  const unpaidCount = invoiceList.filter((inv) => inv.status !== "PAID").length;

  const metrics: DataCardProps[] = [
    {
      title: "Active Cases",
      value: activeCases,
      change: "+3 this month",
      changeType: "positive",
      icon: Folder,
      linkTo: "/cases",
      tooltip: "Click to view all cases",
      sparkline: [5, 6, 7, 6, 8, 9, 10, 12, 11, 13, 15, 14],
    },
    {
      title: "Total Clients",
      value: totalClients,
      change: "+12 this quarter",
      changeType: "positive",
      icon: PeopleRounded,
      linkTo: "/clients",
      tooltip: "Click to view clients",
      sparkline: [50, 55, 60, 65, 70, 80, 100],
    },
    {
      title: "Billable Hours",
      value: "142h",
      change: "This month",
      changeType: "neutral",
      icon: AccessTimeRounded,
      tooltip: "Monthly billable hours",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+8.2% vs last month",
      changeType: "positive",
      icon: AttachMoneyRounded,
      linkTo: "/billing",
      tooltip: "Click to view billing",
      sparkline: [20000, 22000, 21000, 25000, 24000, 26000, 30000],
    },
    {
      title: "Outstanding",
      value: `$${outstanding.toLocaleString()}`,
      change: `${unpaidCount} unpaid invoices`,
      changeType: "negative",
      icon: ReceiptLongRounded,
      linkTo: "/billing",
      tooltip: "Click to view invoices",
      sparkline: [5000, 4500, 4800, 5200, 4900, 5300, 5500],
    },
  ];

  return (
    <Box>
      <Grid container spacing={{ xs: 2, sm: 1, md: 1.5 }} className="my-4">
        {metrics.map((metric) => (
          <Grid key={metric.title} size={{ xs: 6, sm: 2.4 }}>
            <DataCard {...metric} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
