"use client";

import {
  WarningAmber as WarningIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  PersonOutline as PersonIcon,
  MailOutlineRounded as EmailIcon,
  PhoneOutlined as PhoneIcon,
  LocationOnOutlined as LocationIcon,
  ReceiptOutlined as ReceiptIcon,
  ChatBubbleOutlineSharp as ChatIcon,
  CheckCircleOutlineRounded as CheckCircleIcon,
  DescriptionOutlined as DescriptionIcon,
} from "@mui/icons-material";
import { Box, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useAppContext } from "@/providers/AppProvider";
import { PriorityCard } from "@/components/card/PriorityCard";
import { DataCard } from "@/components/card/DataCard";
import { BaseCard } from "@/components/card/BaseCard";
import { InfoRow } from "@/components/ui/row/InfoRow";
import { TaskItem } from "@/components/ui/row/TaskItem";
import { MessageItem } from "@/components/ui/row/MessageItem";
import { FileItem } from "@/components/ui/row/FileItem";
import { DeadlineItem } from "@/components/ui/row/DeadlineItem";
import { formatDate, formatRelativeTimeFromNow } from "@/utils/date";

const ITEMS_PER_CARD = 5;

export default function ClientOverviewPage() {
  const params = useParams();
  const clientId = params.clientId as string;
  const { clients, cases, invoices, communications, documents, tasks } =
    useAppContext();

  const client = clients.getClientById(clientId);
  if (!client) return null;

  // Get client-specific data
  const clientCases = cases.getCasesByClientId(clientId);
  const clientInvoices = invoices.getInvoicesByClient(clientId);
  const clientCommunications =
    communications.getCommunicationsByClient(clientId);
  const clientDocuments = documents.getDocumentsByClient(clientId);

  // Case statistics
  const totalCases = clientCases.length;
  const activeCases = clientCases.filter((c) => c.status === "ACTIVE").length;
  const pendingCases = clientCases.filter((c) => c.status === "PENDING").length;
  const urgentCases = clientCases.filter((c) => c.priority === "URGENT").length;

  // Invoice statistics
  const totalBilled = clientInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidInvoices = clientInvoices.filter((inv) => inv.status === "PAID");
  const unpaidInvoices = clientInvoices.filter((inv) => inv.status !== "PAID");
  const totalInvoices = clientInvoices.length;
  const outstanding = unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0);

  // Get tasks through cases
  const clientTasks = clientCases
    .flatMap((caseItem) => tasks.getTasksByCase(caseItem.id))
    .sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return 0;
    });

  // Priority alerts
  const hasPriority =
    pendingCases > 0 || unpaidInvoices.length > 0 || urgentCases > 0;

  // Handlers
  const handleViewCases = () =>
    console.log(`Navigate to cases for client ${clientId}`);
  const handleViewInvoices = () =>
    console.log(`Navigate to invoices for client ${clientId}`);
  const handleViewTasks = () =>
    console.log(`Navigate to tasks for client ${clientId}`);
  const handleViewCommunications = () =>
    console.log(`Navigate to communications for client ${clientId}`);
  const handleViewFiles = () =>
    console.log(`Navigate to files for client ${clientId}`);
  const handlePhoneClick = (phone: string) => window.open(`tel:${phone}`);

  // Sparkline data
  const caseTrend = [Math.max(1, totalCases - 2), totalCases];
  const activeTrend = [Math.max(1, activeCases - 1), activeCases];
  const billedTrend = [Math.max(0, totalBilled - 1000), totalBilled];
  const outstandingTrend = [Math.max(0, outstanding - 200), outstanding];

  // Invoice aging
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const overdueUnpaid = unpaidInvoices.filter(
    (inv) => inv.dueDate && new Date(inv.dueDate) < today,
  );
  const dueThisWeek = unpaidInvoices.filter(
    (inv) =>
      inv.dueDate &&
      new Date(inv.dueDate) >= today &&
      new Date(inv.dueDate) <= nextWeek,
  );
  const dueLater = unpaidInvoices.filter(
    (inv) => inv.dueDate && new Date(inv.dueDate) > nextWeek,
  );
  const noDueDate = unpaidInvoices.filter((inv) => !inv.dueDate);

  const overdueAmount = overdueUnpaid.reduce((sum, inv) => sum + inv.total, 0);
  const dueThisWeekAmount = dueThisWeek.reduce(
    (sum, inv) => sum + inv.total,
    0,
  );
  const dueLaterAmount = dueLater.reduce((sum, inv) => sum + inv.total, 0);
  const noDueDateAmount = noDueDate.reduce((sum, inv) => sum + inv.total, 0);

  // Recent invoices
  const recentInvoices = [...clientInvoices]
    .sort(
      (a, b) =>
        new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime(),
    )
    .slice(0, 3);

  // Communications
  const unreadCount = clientCommunications.filter(
    (c) => c.status === "UNREAD",
  ).length;
  const recentCommunications = clientCommunications.slice(0, ITEMS_PER_CARD);

  // Get deadlines from cases and tasks
  const caseDeadlines = clientCases
    .filter((c) => c.nextDeadline)
    .map((c) => ({
      id: `case-${c.id}`,
      title: c.title,
      dueDate: c.nextDeadline!,
      type: "case" as const,
      priority: c.priority,
      status: c.status,
    }));

  const taskDeadlines = clientTasks
    .filter((t) => t.dueDate && t.status !== "DONE")
    .map((t) => ({
      id: `task-${t.id}`,
      title: t.title,
      dueDate: t.dueDate!,
      type: "task" as const,
      priority: t.priority,
      status: t.status,
    }));

  const allDeadlines = [...caseDeadlines, ...taskDeadlines]
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, ITEMS_PER_CARD);

  // Recent files
  const recentFiles = [...clientDocuments]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, ITEMS_PER_CARD);

  // Currency formatter
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <Box className="max-w-screen-2xl mx-auto space-y-4">
      {/* Priority Alerts */}
      {hasPriority && (
        <Box>
          <Box className="flex items-center gap-2 mb-2">
            <WarningIcon className="text-amber-500" />
            <Typography className="font-semibold text-gray-700">
              Needs Attention
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {urgentCases > 0 && (
              <Grid size={{ xs: 12, sm: 4, lg: 2.5 }}>
                <PriorityCard
                  title={`${urgentCases} Urgent Case${urgentCases > 1 ? "s" : ""}`}
                  description="Requires immediate attention"
                  type="warning"
                  contentClassName="!p-1.5"
                  onClick={handleViewCases}
                />
              </Grid>
            )}
            {pendingCases > 0 && (
              <Grid size={{ xs: 12, sm: 4, lg: 2.5 }}>
                <PriorityCard
                  title={`${pendingCases} Pending Case${pendingCases > 1 ? "s" : ""}`}
                  description="Awaiting action or response"
                  type="info"
                  contentClassName="!p-1.5"
                  onClick={handleViewCases}
                />
              </Grid>
            )}
            {unpaidInvoices.length > 0 && (
              <Grid size={{ xs: 12, sm: 4, lg: 2.5 }}>
                <PriorityCard
                  title={`${unpaidInvoices.length} Unpaid Invoice${unpaidInvoices.length > 1 ? "s" : ""}`}
                  description="Awaiting payment"
                  type="warning"
                  contentClassName="!p-1.5"
                  onClick={handleViewInvoices}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {/* KPI Cards */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Total Cases"
            value={totalCases}
            change={`${activeCases} active`}
            changeType={activeCases > 0 ? "positive" : "neutral"}
            icon={WorkIcon}
            sparkline={caseTrend}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Active Cases"
            value={activeCases}
            change={
              activeCases > 0
                ? `${Math.round((activeCases / totalCases) * 100)}% of total`
                : "No active cases"
            }
            changeType={activeCases > 0 ? "positive" : "neutral"}
            icon={TrendingUpIcon}
            sparkline={activeTrend}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Total Billed"
            value={formatCurrency(totalBilled)}
            change={`${paidInvoices.length} paid`}
            changeType={paidInvoices.length > 0 ? "positive" : "neutral"}
            icon={AttachMoneyIcon}
            sparkline={billedTrend}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Outstanding"
            value={formatCurrency(outstanding)}
            change={
              unpaidInvoices.length > 0
                ? `${unpaidInvoices.length} unpaid`
                : "All paid"
            }
            changeType={unpaidInvoices.length > 0 ? "negative" : "neutral"}
            icon={ScheduleIcon}
            sparkline={outstandingTrend}
          />
        </Grid>
      </Grid>

      {/* Main Grid */}
      <Grid container spacing={3}>
        {/* Contact Info */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <BaseCard
            title="Contact Information"
            titleIcon={PersonIcon}
            className="h-full"
          >
            <Box className="space-y-1 text-xs">
              <InfoRow icon={EmailIcon} href={`mailto:${client.email}`}>
                {client.email}
              </InfoRow>
              <InfoRow
                icon={PhoneIcon}
                onIconClick={() =>
                  client.phone && handlePhoneClick(client.phone)
                }
              >
                {client.phone}
              </InfoRow>
              <InfoRow icon={LocationIcon}>{client.address}</InfoRow>
            </Box>
            {client.description && (
              <>
                <Divider className="my-3" />
                <Typography className="text-xs text-gray-600 italic">
                  &ldquo;{client.description}&rdquo;
                </Typography>
              </>
            )}
          </BaseCard>
        </Grid>

        {/* Invoice Summary */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <BaseCard
            title="Invoice Summary"
            titleIcon={ReceiptIcon}
            className="h-full"
            action={
              <Button
                size="small"
                variant="text"
                className="text-primary text-xs"
                onClick={handleViewInvoices}
              >
                View All ({totalInvoices})
              </Button>
            }
          >
            <Box className="space-y-2">
              <Box className="flex justify-between text-xs">
                <Box className="text-gray-500">Total Invoices:</Box>
                <Box className="font-medium">{totalInvoices}</Box>
              </Box>
              <Box className="flex justify-between text-xs">
                <Box className="text-gray-500">Total Billed:</Box>
                <Box className="font-medium">{formatCurrency(totalBilled)}</Box>
              </Box>
              <Box className="flex justify-between text-xs">
                <Box className="text-gray-500">Outstanding:</Box>
                <Box className="font-medium text-red-600">
                  {formatCurrency(outstanding)}
                </Box>
              </Box>

              <Divider />

              <Typography className="text-xs font-semibold">
                Unpaid Aging
              </Typography>
              {overdueUnpaid.length > 0 && (
                <Box className="flex justify-between text-xs">
                  <Box className="text-red-600">Overdue</Box>
                  <Box className="font-medium">
                    {overdueUnpaid.length} ({formatCurrency(overdueAmount)})
                  </Box>
                </Box>
              )}
              {dueThisWeek.length > 0 && (
                <Box className="flex justify-between text-xs">
                  <Box className="text-amber-600">Due this week</Box>
                  <Box className="font-medium">
                    {dueThisWeek.length} ({formatCurrency(dueThisWeekAmount)})
                  </Box>
                </Box>
              )}
              {dueLater.length > 0 && (
                <Box className="flex justify-between text-xs">
                  <Box className="text-blue-600">Due later</Box>
                  <Box className="font-medium">
                    {dueLater.length} ({formatCurrency(dueLaterAmount)})
                  </Box>
                </Box>
              )}
              {noDueDate.length > 0 && (
                <Box className="flex justify-between text-xs">
                  <Box className="text-gray-500">No due date</Box>
                  <Box className="font-medium">
                    {noDueDate.length} ({formatCurrency(noDueDateAmount)})
                  </Box>
                </Box>
              )}
              {unpaidInvoices.length === 0 && (
                <Typography className="text-xs text-green-600">
                  ✓ No unpaid invoices
                </Typography>
              )}

              <Divider />

              <Typography className="text-xs font-semibold">
                Recent Invoices
              </Typography>
              {recentInvoices.length > 0 ? (
                recentInvoices.map((inv) => {
                  const color = {
                    PAID: "bg-green-100 text-green-800",
                    OVERDUE: "bg-red-100 text-red-800",
                    UNPAID: "bg-gray-100 text-gray-800",
                    SENT: "bg-blue-100 text-black-800",
                    DEFAULT: "bg-gray-100 text-gray-800",
                  };

                  const statusColor =
                    color[inv.status as keyof typeof color] || color.DEFAULT;

                  return (
                    <Box
                      key={inv.id}
                      className="flex justify-between items-center py-1"
                    >
                      <Box className="min-w-0 flex-1">
                        <Typography className="text-xs truncate">
                          {inv.invoiceNumber ||
                            `Invoice #${inv.id.slice(0, 6)}`}
                        </Typography>
                        <Typography className="text-[10px] text-gray-500">
                          {formatDate(inv.issueDate)}
                        </Typography>
                      </Box>
                      <Box className="flex items-center gap-2 ml-2">
                        <Typography className="text-xs font-medium">
                          {formatCurrency(inv.total)}
                        </Typography>
                        <Chip
                          label={inv.status}
                          size="small"
                          className={`text-[8px] h-5 ${statusColor}`}
                        />
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography className="text-xs text-gray-400">
                  No invoices
                </Typography>
              )}
            </Box>
          </BaseCard>
        </Grid>

        {/* Tasks */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <BaseCard
            title="Recent Tasks"
            titleIcon={CheckCircleIcon}
            action={
              <Button
                size="small"
                variant="text"
                className="text-primary text-xs"
                onClick={handleViewTasks}
              >
                View All ({clientTasks.length})
              </Button>
            }
            className="h-full"
          >
            <Box className="space-y-2 h-52 overflow-y-auto">
              {clientTasks.slice(0, ITEMS_PER_CARD).map((task) => (
                <TaskItem
                  key={task.id}
                  title={task.title}
                  dueDate={task.dueDate}
                  priority={task.priority}
                  status={task.status}
                />
              ))}
              {clientTasks.length === 0 && (
                <Typography className="text-xs text-gray-400 text-center py-4">
                  No tasks
                </Typography>
              )}
            </Box>
          </BaseCard>
        </Grid>

        {/* Communications */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <BaseCard
            title="Recent Messages"
            titleIcon={ChatIcon}
            className="h-full"
            action={
              <Button
                size="small"
                variant="text"
                className="text-primary text-xs"
                onClick={handleViewCommunications}
              >
                View All ({clientCommunications.length})
              </Button>
            }
          >
            <Box className="space-y-2 h-52 overflow-y-auto">
              {recentCommunications.length > 0 ? (
                recentCommunications.map((msg) => (
                  <MessageItem
                    key={msg.id}
                    senderId={msg.clientId}
                    message={msg.content || msg.subject || "No content"}
                    time={msg.time}
                    type={msg.type}
                    status={msg.status}
                    clients={clients.clientsMap}
                  />
                ))
              ) : (
                <Typography className="text-xs text-gray-400 text-center py-4">
                  No recent messages
                </Typography>
              )}
            </Box>
          </BaseCard>
        </Grid>

        {/* Recent Files */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <BaseCard
            title="Recent Files"
            titleIcon={DescriptionIcon}
            className="h-full"
            action={
              <Button
                size="small"
                variant="text"
                className="text-primary text-xs"
                onClick={handleViewFiles}
              >
                View All ({clientDocuments.length})
              </Button>
            }
          >
            <Box className="space-y-2 h-52">
              {recentFiles.length > 0 ? (
                recentFiles.map((file) => (
                  <FileItem
                    key={file.id}
                    name={file.name}
                    date={formatRelativeTimeFromNow(file.createdAt)}
                    size={file.size}
                  />
                ))
              ) : (
                <Typography className="text-xs text-gray-400 text-center py-4">
                  No recent files
                </Typography>
              )}
            </Box>
          </BaseCard>
        </Grid>

        {/* Upcoming Deadlines */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <BaseCard
            title="Upcoming Deadlines"
            titleIcon={ScheduleIcon}
            className="h-full"
            action={
              <Button
                size="small"
                variant="text"
                className="text-primary text-xs"
                onClick={handleViewFiles}
              >
                View All ({allDeadlines.length})
              </Button>
            }
          >
            <Box className="space-y-2 h-52">
              {allDeadlines.length > 0 ? (
                allDeadlines.map((item) => (
                  <DeadlineItem
                    key={item.id}
                    title={item.title}
                    dueDate={item.dueDate}
                    type={item.type}
                    priority={item.priority}
                  />
                ))
              ) : (
                <Typography className="text-xs text-gray-400 text-center py-4">
                  No upcoming deadlines
                </Typography>
              )}
            </Box>
          </BaseCard>
        </Grid>
      </Grid>

      {/* Summary Footer */}
      <Box className="pb-4 md:pb-6 lg:pb-0">
        <BaseCard className="bg-linear-to-r from-primary/5 to-transparent p-0.5 md:p-1">
          <Box className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
            <Box className="font-semibold text-primary flex items-center gap-1 text-sm md:text-base">
              <Box>📊</Box> Summary:
            </Box>

            <Box className="flex flex-wrap gap-3 text-xs md:text-sm">
              <Box className="flex items-center gap-1">
                <Box className="w-2 h-2 rounded-full bg-green-500" />
                <Box className="text-gray-700 whitespace-nowrap">
                  {activeCases} active
                </Box>
              </Box>

              <Box className="flex items-center gap-1">
                <Box className="w-2 h-2 rounded-full bg-amber-500" />
                <Box className="text-gray-700 whitespace-nowrap">
                  {pendingCases} pending
                </Box>
              </Box>

              <Box className="flex items-center gap-1">
                <Box className="w-2 h-2 rounded-full bg-red-500" />
                <Box className="text-gray-700 whitespace-nowrap">
                  {urgentCases} urgent
                </Box>
              </Box>

              <Box className="flex items-center gap-1">
                <Box className="text-green-600 font-medium">$</Box>
                <Box className="text-gray-700 whitespace-nowrap">
                  {formatCurrency(totalBilled)} billed
                </Box>
              </Box>

              {outstanding > 0 ? (
                <Box className="flex items-center gap-1">
                  <Box className="text-red-600">⚠️</Box>
                  <Box className="text-gray-700 whitespace-nowrap">
                    {unpaidInvoices.length} unpaid (
                    {formatCurrency(outstanding)})
                  </Box>
                </Box>
              ) : (
                <Box className="flex items-center gap-1">
                  <Box className="text-green-600">✓</Box>
                  <Box className="text-gray-700 whitespace-nowrap">
                    All paid
                  </Box>
                </Box>
              )}

              <Box className="flex items-center gap-1">
                <Box className="text-blue-600">✉️</Box>
                <Box className="text-gray-700 whitespace-nowrap">
                  {unreadCount} unread
                </Box>
              </Box>
            </Box>
          </Box>
        </BaseCard>
      </Box>
    </Box>
  );
}
