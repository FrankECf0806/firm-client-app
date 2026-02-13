"use client";

import {
  AccessTimeRounded,
  AttachMoneyRounded,
  Folder,
  PeopleRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { MetricCard } from "@/components/card/MetricCard";
import { useAppContext } from "@/providers/AppProvider";
import { MetricCardProps } from "@/types/metric";

export function Metric() {
  const { cases, clients, invoices } = useAppContext();

  // Metrics
  const activeCases = cases.filter((c) => c.status === "ACTIVE").length;
  const totalClients = clients.length;
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const outstanding = invoices
    .filter((inv) => inv.status !== "PAID")
    .reduce((sum, inv) => sum + inv.total, 0);
  const unpaidCount = invoices.filter((inv) => inv.status !== "PAID").length;

  const metrics: MetricCardProps[] = [
    {
      title: "Active Cases",
      value: activeCases,
      change: "+3 this month",
      changeType: "positive",
      icon: Folder,
      linkTo: "/cases",
      tooltip: "Click to view all cases",
    },
    {
      title: "Total Clients",
      value: totalClients,
      change: "+12 this quarter",
      changeType: "positive",
      icon: PeopleRounded,
      linkTo: "/clients",
      tooltip: "Click to view clients",
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
    },
    {
      title: "Outstanding",
      value: `$${outstanding.toLocaleString()}`,
      change: `${unpaidCount} unpaid invoices`,
      changeType: "negative",
      icon: ReceiptLongRounded,
      linkTo: "/billing",
      tooltip: "Click to view invoices",
    },
  ];

  return (
    <Box>
      <Grid container spacing={2} className="my-4">
        {metrics.map((metric) => (
          <Grid key={metric.title} size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }}>
            <MetricCard {...metric} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
