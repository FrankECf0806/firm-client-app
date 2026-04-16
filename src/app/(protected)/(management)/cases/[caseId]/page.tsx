"use client";

import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import {
  Work as WorkIcon,
  TaskOutlined as TaskIcon,
  DescriptionOutlined as DocumentIcon,
  Schedule as ScheduleIcon,
  Group as UsersIcon,
  PersonOutline as PersonIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { DataCard } from "@/components/card/DataCard";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useAppContext } from "@/providers/AppProvider";
import { formatDate, formatRelativeTimeFromNow } from "@/utils/date";
import { CLIENT_TYPE_CONFIG } from "@/utils/constant/client";
import { BaseCard } from "@/components/card/BaseCard";
import { ClientInfoCard } from "@/components/card/client/ClientInfoCard";
import { TaskStatus } from "@/enums/task";
import { TaskItem } from "@/components/ui/row/TaskItem";
import { OVERVIEW_FILTER_TASK_STATUS } from "@/utils/constant/task";
import { FileItem } from "@/components/ui/row/FileItem";
import { DeadlineItem } from "@/components/ui/row/DeadlineItem";
import { TeamMemberItem } from "@/components/ui/row/TeamMemberItem";

export default function CaseOverviewPage() {
  const params = useParams();
  const caseId = params.caseId as string;

  const {
    cases,
    clients,
    tasks: tasksService,
    documents: documentsService,
    communications: communicationsService,
  } = useAppContext();

  const caseItem = cases.getCaseById(caseId);

  // All hooks must be called unconditionally, so we use optional chaining where caseItem might be null
  const client = caseItem ? clients.getClientById(caseItem.clientId) : null;
  const clientName = client
    ? `${client.firstName} ${client.lastName}`
    : "Unknown Client";

  // Related data (these will be empty arrays if caseItem is null)
  const caseTasks = useMemo(
    () => (caseItem ? tasksService.getTasksByCase(caseId) : []),
    [tasksService, caseId, caseItem],
  );
  const caseDocuments = useMemo(
    () => (caseItem ? documentsService.getDocumentsByCase(caseId) : []),
    [documentsService, caseId, caseItem],
  );
  const caseCommunications = useMemo(
    () =>
      caseItem ? communicationsService.getCommunicationsByCase(caseId) : [],
    [communicationsService, caseId, caseItem],
  );

  // Task counts for stats
  const taskTodo = caseTasks.filter((t) => t.status === TaskStatus.TODO).length;
  const taskInProgress = caseTasks.filter(
    (t) => t.status === TaskStatus.IN_PROGRESS,
  ).length;

  const tasksByStatus = useMemo(() => {
    const result: Partial<Record<TaskStatus, typeof caseTasks>> = {};
    OVERVIEW_FILTER_TASK_STATUS.forEach(([status]) => {
      result[status as TaskStatus] = caseTasks.filter(
        (t) => t.status === status,
      );
    });
    return result;
  }, [caseTasks]);

  // Team members (unique from tasks, case notes, communications)
  const team = useMemo(() => {
    if (!caseItem) return [];
    const users = new Set<string>();
    caseTasks.forEach((task) => {
      if (task.assignedTo) users.add(task.assignedTo);
    });
    caseItem.notes?.forEach((note) => {
      if (note.author) users.add(note.author);
    });
    caseCommunications.forEach((comm) => {
      if (comm.author) users.add(comm.author);
    });
    return Array.from(users);
  }, [caseTasks, caseItem, caseCommunications]);

  const tasksByUser = useMemo(() => {
    const map = new Map<string, number>();
    team.forEach((user) => map.set(user, 0));
    caseTasks.forEach((task) => {
      if (task.assignedTo && map.has(task.assignedTo)) {
        map.set(task.assignedTo, map.get(task.assignedTo)! + 1);
      }
    });
    return map;
  }, [team, caseTasks]);

  const caseActivityByUser = useMemo(() => {
    const map = new Map<string, number>();
    team.forEach((user) => map.set(user, 0));

    caseItem?.notes?.forEach((note) => {
      if (note.author && map.has(note.author)) {
        map.set(note.author, map.get(note.author)! + 1);
      }
    });

    caseCommunications.forEach((comm) => {
      if (comm.author && map.has(comm.author)) {
        map.set(comm.author, map.get(comm.author)! + 1);
      }
    });

    return map;
  }, [team, caseItem, caseCommunications]);

  const getTaskCount = (user: string) => tasksByUser.get(user) ?? 0;
  const getActivityCount = (user: string) => caseActivityByUser.get(user) ?? 0;

  // Upcoming deadlines (case + tasks)
  const upcomingDeadlines = useMemo(() => {
    if (!caseItem) return [];
    const caseDeadline = caseItem.nextDeadline
      ? [
          {
            id: `case-${caseItem.id}`,
            title: caseItem.title,
            dueDate: caseItem.nextDeadline,
            type: "case" as const,
            priority: caseItem.priority,
          },
        ]
      : [];

    const taskDeadlines = caseTasks
      .filter((t) => t.dueDate && t.status !== TaskStatus.DONE)
      .map((t) => ({
        id: `task-${t.id}`,
        title: t.title,
        dueDate: t.dueDate!,
        type: "task" as const,
        priority: t.priority,
      }));

    return [...caseDeadline, ...taskDeadlines]
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      )
      .slice(0, 5);
  }, [caseItem, caseTasks]);

  // Early return after all hooks (but must return consistent UI)
  if (!caseItem) {
    return (
      <Box className="pb-10 xs:-pb-10 md:pb-5 max-w-screen-2xl mx-auto space-y-4">
        <Typography>Case not found.</Typography>
      </Box>
    );
  }

  return (
    <Box className="pb-10 xs:-pb-10 md:pb-5 max-w-screen-2xl mx-auto space-y-4">
      {/* KPI Cards */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Tasks"
            value={caseTasks.length}
            change={`${taskTodo} todo • ${taskInProgress} in progress`}
            changeType={caseTasks.length > 0 ? "positive" : "neutral"}
            icon={TaskIcon}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Documents"
            value={caseDocuments.length}
            change="Files linked to this case"
            icon={DocumentIcon}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Opened"
            value={formatDate(caseItem.createdAt)}
            change={
              caseItem.nextDeadline
                ? `Deadline ${formatDate(caseItem.nextDeadline)}`
                : "No deadline set"
            }
            icon={ScheduleIcon}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DataCard
            size="sm"
            title="Client"
            value={clientName}
            change={
              client
                ? CLIENT_TYPE_CONFIG[client.type].label
                : "Unknown Client Type"
            }
            changeType="neutral"
            icon={PersonIcon}
          />
        </Grid>
      </Grid>

      {/* First row: Client Info (left) + Task Pipeline (right) */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ClientInfoCard client={client} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <BaseCard
            title="Task Pipeline"
            titleIcon={WorkIcon}
            action={
              <Button
                component={Link}
                href={`/cases/${caseId}/tasks`}
                size="small"
                variant="text"
                className="text-primary text-xs"
              >
                View All ({caseTasks.length})
              </Button>
            }
          >
            {caseTasks.length > 0 ? (
              <Grid container spacing={2} alignItems="stretch">
                {OVERVIEW_FILTER_TASK_STATUS.map(([status, config]) => {
                  const statusKey = status as TaskStatus;
                  const tasksForStatus = tasksByStatus[statusKey] || [];
                  return (
                    <Grid key={status} size={{ xs: 12, sm: 4 }}>
                      <Box className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <Box
                          className={`flex items-center justify-between px-3 py-2 ${config.styling?.unselectedClass}`}
                        >
                          <Typography
                            variant="subtitle2"
                            className="font-semibold text-gray-900"
                          >
                            {config.label}
                          </Typography>
                          <Chip
                            size="small"
                            label={tasksForStatus.length}
                            className={`text-[10px] h-6 w-6 ${config.styling?.selectedClass}`}
                          />
                        </Box>
                        <Box className="grow p-3 space-y-2">
                          {tasksForStatus.length > 0 ? (
                            tasksForStatus
                              .slice(0, 3)
                              .map((task) => (
                                <TaskItem
                                  key={task.id}
                                  title={task.title}
                                  dueDate={task.dueDate}
                                  priority={task.priority}
                                  status={task.status}
                                />
                              ))
                          ) : (
                            <Box className="text-center py-4 text-gray-400 text-sm border border-dashed border-gray-300 rounded-md min-h-18 flex items-center justify-center">
                              No items
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Box className="text-center py-6">
                <Typography className="text-sm text-gray-500">
                  No tasks yet
                </Typography>
                <Button
                  component={Link}
                  href={`/cases/${caseId}/tasks`}
                  variant="contained"
                  size="small"
                  className="mt-2"
                >
                  Add first task
                </Button>
              </Box>
            )}
          </BaseCard>
        </Grid>
      </Grid>

      {/* Second row: Team, Document Vault, Upcoming Deadlines */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <BaseCard
            title="Team"
            titleIcon={UsersIcon}
            action={
              team.length > 0 ? (
                <Button
                  component={Link}
                  href={`/cases/${caseId}/team`}
                  size="small"
                  variant="text"
                  className="text-primary text-xs"
                >
                  View All ({team.length})
                </Button>
              ) : undefined
            }
          >
            {team.length === 0 ? (
              <Typography className="text-sm text-gray-500 text-center py-4">
                No team members assigned yet.
              </Typography>
            ) : (
              <Stack spacing={1}>
                {team.slice(0, 5).map((user) => (
                  <TeamMemberItem
                    key={user}
                    name={user}
                    taskCount={getTaskCount(user)}
                    caseActivityCount={getActivityCount(user)}
                  />
                ))}
              </Stack>
            )}
          </BaseCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <BaseCard
            title="Document Vault"
            titleIcon={DocumentIcon}
            action={
              <Button
                component={Link}
                href={`/cases/${caseId}/documents/new`}
                size="small"
                variant="text"
                className="text-primary text-xs"
              >
                Upload
              </Button>
            }
          >
            {caseDocuments.length > 0 ? (
              <Box className="space-y-2">
                {caseDocuments.slice(0, 5).map((doc) => (
                  <FileItem
                    key={doc.id}
                    name={doc.name}
                    date={formatRelativeTimeFromNow(doc.createdAt)}
                    size={doc.size}
                  />
                ))}
                {caseDocuments.length > 5 && (
                  <Button
                    component={Link}
                    href={`/cases/${caseId}/documents`}
                    size="small"
                    variant="text"
                    className="mt-2"
                  >
                    View all {caseDocuments.length} documents
                  </Button>
                )}
              </Box>
            ) : (
              <Box className="text-center py-6">
                <Typography className="text-sm text-gray-500">
                  No documents uploaded
                </Typography>
                <Button
                  component={Link}
                  href={`/cases/${caseId}/documents`}
                  variant="contained"
                  size="small"
                  className="mt-2"
                >
                  Upload first document
                </Button>
              </Box>
            )}
          </BaseCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <BaseCard title="Upcoming Deadlines" titleIcon={ScheduleIcon}>
            {upcomingDeadlines.length === 0 ? (
              <Typography className="text-sm text-gray-500 text-center py-4">
                No upcoming deadlines.
              </Typography>
            ) : (
              <Box className="space-y-2">
                {upcomingDeadlines.map((item) => (
                  <DeadlineItem
                    key={item.id}
                    title={item.title}
                    dueDate={item.dueDate}
                    type={item.type}
                    priority={item.priority}
                  />
                ))}
              </Box>
            )}
          </BaseCard>
        </Grid>
      </Grid>
    </Box>
  );
}
