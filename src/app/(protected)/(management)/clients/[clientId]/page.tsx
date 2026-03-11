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
  Receipt as ReceiptIcon,
  Chat as ChatIcon,
  InsertDriveFile as FileIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useAppContext } from "@/providers/AppProvider";
import { PriorityCard } from "@/components/card/PriorityCard";
import { DataCard } from "@/components/card/DataCard";
import { BaseCard } from "@/components/card/BaseCard";
import { InfoRow } from "@/components/ui/info/InfoRow";

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

  // Case statistics
  const totalCases = clientCases.length;
  const activeCases = clientCases.filter((c) => c.status === "ACTIVE").length;
  const pendingCases = clientCases.filter((c) => c.status === "PENDING").length;
  //   const closedCases = clientCases.filter(
  //     (c) => c.status === "CLOSED" || c.status === "ARCHIVED",
  //   ).length;
  const urgentCases = clientCases.filter((c) => c.priority === "URGENT").length;

  // Invoice statistics
  const totalBilled = clientInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidInvoices = clientInvoices.filter((inv) => inv.status === "PAID");
  const unpaidInvoices = clientInvoices.filter((inv) => inv.status !== "PAID");
  //   const overdueInvoices = clientInvoices.filter(
  //     (inv) => inv.status === "OVERDUE",
  //   );
  const totalInvoices = clientInvoices.length;
  //   const paidPercentage =
  //     totalInvoices > 0
  //       ? Math.round((paidInvoices.length / totalInvoices) * 100)
  //       : 0;
  const outstanding = unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0);
  //   const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.total, 0);

  // Get documents through cases
  const clientDocuments = clientCases
    .flatMap((caseItem) => documents.getDocumentsByCase(caseItem.id))
    .sort(
      (a, b) =>
        new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
    );
  const clientTasks = clientCases
    .flatMap((caseItem) => tasks.getTasksByCase(caseItem.id))
    .sort((a, b) => {
      // If both have dueDate, sort by date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      // If only a has dueDate, a comes first
      if (a.dueDate) return -1;
      // If only b has dueDate, b comes first
      if (b.dueDate) return 1;
      // If neither has dueDate, keep original order
      return 0;
    });
  //   const clientMeetings = clientCases
  //     .flatMap((caseItem) => meetings.getMeetingsByCase(caseItem.id))
  //     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Summary priority logic
  const hasPriority =
    pendingCases > 0 || unpaidInvoices.length > 0 || urgentCases > 0;

  const handleViewCases = () => {
    console.log(`Navigate to cases for client ${clientId}`);
  };

  // Sparkline data (simplified trends)
  const caseTrend = [Math.max(1, totalCases - 2), totalCases];
  const activeTrend = [Math.max(1, activeCases - 1), activeCases];
  const billedTrend = [Math.max(0, totalBilled - 1000), totalBilled];
  const outstandingTrend = [Math.max(0, outstanding - 200), outstanding];

  // Monthly activity data (mock for now - you can replace with real data)
  //   const monthlyCaseActivity = [4, 6, 8, 5, 7, 3, 0, 2, 0, 1, 4, 6];
  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   const totalActivities = monthlyCaseActivity.reduce((a, b) => a + b, 0);

  // Invoice aging (based on due date)
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

  // Recent invoices (last 3 by issue date)
  const recentInvoices = [...clientInvoices]
    .sort(
      (a, b) =>
        new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime(),
    )
    .slice(0, 3);

  // Tasks stats
  //   const totalTasks = clientTasks.length;
  //   const pendingTasks = clientTasks.filter((t) => !t.completed);
  //   const completedTasks = clientTasks.filter((t) => t.completed);

  // Communications
  const unreadCount = clientCommunications.filter((c) => c.unread).length;
  const recentCommunications = clientCommunications.slice(0, 3);

  // Upcoming deadlines
  const upcomingDeadlines = clientCases
    .filter((c) => c.nextDeadline && new Date(c.nextDeadline) > new Date())
    .sort(
      (a, b) =>
        new Date(a.nextDeadline!).getTime() -
        new Date(b.nextDeadline!).getTime(),
    )
    .slice(0, 5);

  // Upcoming meetings
  //   const upcomingMeetings = clientMeetings
  //     .filter((m) => new Date(m.date) > new Date() && m.status === "SCHEDULED")
  //     .slice(0, 3);

  // Recent files
  const recentFiles = clientDocuments.slice(0, 3);

  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleViewInvoices = () => {
    console.log(`Navigate to invoices for client ${clientId}`);
  };

  const handleViewTasks = () => {
    console.log(`Navigate to tasks for client ${clientId}`);
  };

  const handleViewCommunications = () => {
    console.log(`Navigate to communications for client ${clientId}`);
  };

  const handleViewFiles = () => {
    console.log(`Navigate to files for client ${clientId}`);
  };

  // Helper to format currency
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  // Task item component
  const TaskItem = ({
    title,
    dueDate,
    priority,
    completed,
  }: {
    title: string;
    dueDate?: string;
    priority: string;
    completed: boolean;
  }) => {
    const priorityColors = {
      HIGH: "bg-red-100 text-red-700",
      URGENT: "bg-orange-100 text-orange-700",
      MEDIUM: "bg-yellow-100 text-yellow-700",
      LOW: "bg-green-100 text-green-700",
    };
    const date = dueDate
      ? new Date(dueDate).toLocaleDateString()
      : "No due date";
    return (
      <Box className="flex items-center justify-between py-1.5">
        <Box className="flex items-center gap-2">
          {completed ? (
            <CheckCircleIcon className="text-green-500 text-sm" />
          ) : (
            <CancelIcon className="text-gray-300 text-sm" />
          )}
          <Typography
            className={`text-xs ${completed ? "line-through text-gray-400" : "text-gray-700"}`}
          >
            {title}
          </Typography>
        </Box>
        <Box className="flex items-center gap-2">
          <Typography className="text-[10px] text-gray-500">{date}</Typography>
          <Chip
            label={priority}
            size="small"
            className={`text-[8px] h-4 ${priorityColors[priority as keyof typeof priorityColors] || "bg-gray-100"}`}
          />
        </Box>
      </Box>
    );
  };

  // Message Item Component
  const MessageItem = ({
    senderId,
    message,
    time,
    unread,
  }: {
    senderId: string;
    message: string;
    time: string;
    unread?: boolean;
  }) => {
    const sender = clients.getClientById(senderId);
    const senderName = sender
      ? `${sender.firstName} ${sender.lastName}`
      : "Unknown Sender";
    return (
      <Box
        className={`flex items-start gap-2 py-2 ${
          unread ? "bg-blue-50/50 -mx-2 px-2 rounded" : ""
        }`}
      >
        <Avatar className="bg-primary/10 text-primary w-6 h-6 text-xs">
          {senderName[0]}
        </Avatar>
        <Box className="flex-1 min-w-0">
          <Box className="flex justify-between items-center">
            <Typography
              className={`text-xs font-medium truncate ${
                unread ? "text-primary" : "text-gray-900"
              }`}
            >
              {senderName}
            </Typography>
            <Typography className="text-[10px] text-gray-400 whitespace-nowrap ml-1">
              {time}
            </Typography>
          </Box>
          <Typography className="text-[11px] text-gray-600 truncate">
            {message}
          </Typography>
          {unread && (
            <Chip
              label="New"
              size="small"
              className="mt-0.5 bg-blue-100 text-blue-600 text-[8px] h-4"
            />
          )}
        </Box>
      </Box>
    );
  };

  // File Item Component
  const FileItem = ({
    name,
    date,
    size,
  }: {
    name: string;
    date: string;
    size: string;
  }) => (
    <Box className="flex items-center gap-2 py-2">
      <Box className="p-1 rounded bg-blue-50">
        <FileIcon className="text-blue-500 text-xs" />
      </Box>
      <Box className="flex-1 min-w-0">
        <Typography className="text-xs font-medium text-gray-900 truncate">
          {name}
        </Typography>
        <Typography className="text-[10px] text-gray-500">
          {date} · {size}
        </Typography>
      </Box>
      <Chip
        label="PDF"
        size="small"
        className="bg-gray-100 text-gray-600 text-[8px] h-4"
      />
    </Box>
  );

  return (
    <Box className="p-1 max-w-screen-2xl mx-auto space-y-4">
      {/* Priority Alerts (only if needed) */}
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
                  onClick={handleViewCases}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {/* KPI Cards with Sparklines */}
      <Grid container spacing={2}>
        {/* Total Cases */}
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Total Cases"
            value={totalCases}
            change={`${activeCases} active`}
            changeType={
              activeCases >= 0
                ? activeCases > 0
                  ? "positive"
                  : "neutral"
                : "negative"
            }
            icon={WorkIcon}
            sparkline={caseTrend}
          />
        </Grid>
        {/* Active Cases */}
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
            changeType={
              activeCases >= 0
                ? activeCases > 0
                  ? "positive"
                  : "neutral"
                : "negative"
            }
            icon={TrendingUpIcon}
            sparkline={activeTrend}
          />
        </Grid>
        {/* Total Billed */}
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Total Billed"
            value={`$${totalBilled.toLocaleString()}`}
            change={`${paidInvoices.length} paid`}
            changeType={
              paidInvoices.length >= 0
                ? paidInvoices.length > 0
                  ? "positive"
                  : "neutral"
                : "negative"
            }
            icon={AttachMoneyIcon}
            iconBgColor="bg-purple-500/10"
            iconColor="text-purple-500"
            sparkline={billedTrend}
            chartColor="#8b5cf6"
          />
        </Grid>
        {/* Outstanding Amount */}
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Outstanding"
            value={`$${outstanding.toLocaleString()}`}
            change={
              unpaidInvoices.length > 0
                ? `${unpaidInvoices.length} unpaid`
                : "All paid"
            }
            changeType={unpaidInvoices.length > 0 ? "negative" : "positive"}
            icon={ScheduleIcon}
            sparkline={outstandingTrend}
          />
        </Grid>
      </Grid>

      {/* Main Dashboard Grid */}
      <Grid container spacing={3}>
        {/* Contact Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <BaseCard
            title="Contact Information"
            titleIcon={<PersonIcon className="text-lg" />}
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
                  ``{client.description}``
                </Typography>
              </>
            )}
          </BaseCard>
        </Grid>

        {/* Financial Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Invoice Status */}
          <BaseCard
            title="Invoice Summary"
            titleIcon={<ReceiptIcon className="text-lg" />}
            action={
              <Button
                size="small"
                variant="text"
                className="text-primary text-xs"
                onClick={handleViewInvoices}
              >
                View All
              </Button>
            }
          >
            <Box className="space-y-2">
              {/* Totals mini row */}
              <Box className="flex justify-between text-xs">
                <span className="text-gray-500">Total Invoices:</span>
                <span className="font-medium">{totalInvoices}</span>
              </Box>
              <Box className="flex justify-between text-xs">
                <span className="text-gray-500">Total Billed:</span>
                <span className="font-medium">
                  {formatCurrency(totalBilled)}
                </span>
              </Box>
              <Box className="flex justify-between text-xs">
                <span className="text-gray-500">Outstanding:</span>
                <span className="font-medium text-red-600">
                  {formatCurrency(outstanding)}
                </span>
              </Box>

              <Divider />

              {/* Aging buckets */}
              <Typography className="text-xs font-semibold">
                Unpaid Aging
              </Typography>
              {overdueUnpaid.length > 0 && (
                <Box className="flex justify-between text-xs">
                  <span className="text-red-600">Overdue</span>
                  <span className="font-medium">
                    {overdueUnpaid.length} ({formatCurrency(overdueAmount)})
                  </span>
                </Box>
              )}
              {dueThisWeek.length > 0 && (
                <Box className="flex justify-between text-xs">
                  <span className="text-amber-600">Due this week</span>
                  <span className="font-medium">
                    {dueThisWeek.length} ({formatCurrency(dueThisWeekAmount)})
                  </span>
                </Box>
              )}
              {dueLater.length > 0 && (
                <Box className="flex justify-between text-xs">
                  <span className="text-blue-600">Due later</span>
                  <span className="font-medium">
                    {dueLater.length} ({formatCurrency(dueLaterAmount)})
                  </span>
                </Box>
              )}
              {noDueDate.length > 0 && (
                <Box className="flex justify-between text-xs">
                  <span className="text-gray-500">No due date</span>
                  <span className="font-medium">
                    {noDueDate.length} ({formatCurrency(noDueDateAmount)})
                  </span>
                </Box>
              )}
              {unpaidInvoices.length === 0 && (
                <Typography className="text-xs text-green-600">
                  ✓ No unpaid invoices
                </Typography>
              )}

              <Divider />

              {/* Recent Invoices List */}
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
                          {new Date(inv.issueDate).toLocaleDateString()}
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
        <Grid size={{ xs: 12, md: 4 }}>
          <BaseCard
            title="Recent Tasks"
            titleIcon={<CheckCircleIcon className="text-lg" />}
            action={
              <Button
                size="small"
                variant="text"
                className="text-primary text-xs"
                onClick={handleViewTasks}
              >
                View All
              </Button>
            }
          >
            <Box className="space-y-2">
              {clientTasks.slice(0, 5).map((task) => (
                <TaskItem
                  key={task.id}
                  title={task.title}
                  dueDate={task.dueDate}
                  priority={task.priority}
                  completed={task.completed}
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
        <Grid size={{ xs: 12, md: 4 }}>
          <BaseCard
            title="Recent Messages"
            titleIcon={<ChatIcon className="text-lg" />}
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
            <Box className="space-y-1  h-40 max-h-45 overflow-y-auto">
              {recentCommunications.length > 0 ? (
                recentCommunications.map((msg) => (
                  <MessageItem
                    key={msg.id}
                    senderId={msg.clientId}
                    message={msg.content || msg.subject || "No content"}
                    time={msg.time}
                    unread={msg.unread}
                  />
                ))
              ) : (
                <Typography className="text-xs text-gray-400 text-center py-4">
                  No recent messages
                </Typography>
              )}
              {unreadCount > 0 && (
                <Box className="pt-2 text-center">
                  <Chip
                    label={`${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`}
                    size="small"
                    className="bg-blue-100 text-blue-600 text-[10px]"
                  />
                </Box>
              )}
            </Box>
          </BaseCard>
        </Grid>

        {/* Recent Files */}
        <Grid size={{ xs: 12, md: 4 }}>
          <BaseCard
            title="Recent Files"
            titleIcon={<DescriptionIcon className="text-lg" />}
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
            <Box className="space-y-1 max-h-64 overflow-y-auto">
              {recentFiles.length > 0 ? (
                recentFiles.map((file) => {
                  const date = new Date(file.uploadDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    },
                  );
                  return (
                    <FileItem
                      key={file.id}
                      name={file.name}
                      date={date}
                      size={file.size}
                    />
                  );
                })
              ) : (
                <Typography className="text-xs text-gray-400 text-center py-4">
                  No recent files
                </Typography>
              )}
            </Box>
          </BaseCard>
        </Grid>

        {/* Upcoming Deadlines */}
        <Grid size={{ xs: 12, md: 4 }}>
          <BaseCard
            title="Upcoming Deadlines"
            titleIcon={<AccessTimeIcon className="text-lg" />}
          >
            <Box className="space-y-2 max-h-64 overflow-y-auto">
              {upcomingDeadlines.map((caseItem) => {
                const daysLeft = Math.ceil(
                  (new Date(caseItem.nextDeadline!).getTime() -
                    new Date().getTime()) /
                    (1000 * 60 * 60 * 24),
                );
                return (
                  <Box
                    key={caseItem.id}
                    className="flex justify-between items-center py-1.5"
                  >
                    <Box className="flex-1">
                      <Typography className="text-xs font-medium">
                        {caseItem.title}
                      </Typography>
                      <Typography className="text-[10px] text-gray-500">
                        {new Date(caseItem.nextDeadline!).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Chip
                      label={
                        daysLeft <= 3 ? `${daysLeft} days` : `${daysLeft} days`
                      }
                      size="small"
                      className={
                        daysLeft <= 3
                          ? "bg-red-100 text-red-700 text-[10px]"
                          : "bg-gray-100 text-gray-700 text-[10px]"
                      }
                    />
                  </Box>
                );
              })}
              {upcomingDeadlines.length === 0 && (
                <Typography className="text-xs text-gray-400 text-center py-4">
                  No upcoming deadlines
                </Typography>
              )}
            </Box>
          </BaseCard>
        </Grid>
      </Grid>

      {/* Summary Footer */}
      <Box className="bg-linear-to-r from-primary/5 to-transparent p-3 rounded-lg border border-primary/10">
        <Typography className="text-gray-600 text-xs flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-primary">📊 Summary:</span>
          <span>
            {activeCases} active · {pendingCases} pending · {urgentCases} urgent
            · ${totalBilled.toLocaleString()} billed ·
            {outstanding > 0
              ? `${unpaidInvoices.length} unpaid ($${outstanding.toLocaleString()})`
              : "All paid"}{" "}
            ·{unreadCount} unread
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
