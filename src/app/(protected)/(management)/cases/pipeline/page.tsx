"use client";

import { Box, Grid, Typography } from "@mui/material";
import {
  ALL_CASE_STATUS,
  CASE_PRIORITY_CONFIG,
  CASE_STATUS_PIPELINE,
} from "@/utils/constant/case";
import { useMemo, useState, useRef } from "react";
import { useAppContext } from "@/providers/AppProvider";
import { BaseCard } from "@/components/card/BaseCard";
import { BusinessCenter } from "@mui/icons-material";
import { CaseCard } from "@/components/card/cases/CaseCard";
import { DroppableColumn } from "@/components/card/cases/DroppableColumn";
import { useHelperFunctions } from "@/utils/helper/global";
import { Case } from "@/types/case";
import { DragDropProvider } from "@dnd-kit/react";

export default function CasesPipelinePage() {
  const [filterArea] = useState(ALL_CASE_STATUS);
  const { cases, clients } = useAppContext();
  const [draggedCaseId, setDraggedCaseId] = useState<string | null>(null);
  const { getThemeColor } = useHelperFunctions();

  const statsScrollRef = useRef<HTMLDivElement>(null);
  const boardScrollRef = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);

  const { cases: casesList, updateCase } = cases;
  const { getClientById } = clients;

  const PRIORITY_ORDER = Object.keys(CASE_PRIORITY_CONFIG).filter(
    (k) => k !== ALL_CASE_STATUS && k !== "ALL_CASE_PRIORITY",
  );
  const sortedPriorityKeys = [...PRIORITY_ORDER].reverse();

  const getPriorityRank = (priority?: string): number => {
    if (!priority) return 999;
    const idx = sortedPriorityKeys.indexOf(priority.toUpperCase());
    return idx === -1 ? 999 : idx;
  };

  const pipelineCases = useMemo(() => {
    return casesList
      .filter(
        (c) => filterArea === ALL_CASE_STATUS || c.practiceArea === filterArea,
      )
      .map((c) => {
        const client = getClientById(c.clientId);
        const clientName = `${client?.firstName} ${client?.lastName}`;
        return { ...c, clientName };
      });
  }, [casesList, filterArea, getClientById]);

  const sortCases = <T extends { nextDeadline?: string; priority?: string }>(
    list: T[],
  ): T[] => {
    return [...list].sort((a, b) => {
      const aTime = a.nextDeadline
        ? new Date(a.nextDeadline).getTime()
        : Infinity;
      const bTime = b.nextDeadline
        ? new Date(b.nextDeadline).getTime()
        : Infinity;
      if (aTime !== bTime) return aTime - bTime;
      return getPriorityRank(a.priority) - getPriorityRank(b.priority);
    });
  };

  const handleStatsScroll = () => {
    if (isSyncingRef.current) return;
    if (statsScrollRef.current && boardScrollRef.current) {
      isSyncingRef.current = true;
      boardScrollRef.current.scrollLeft = statsScrollRef.current.scrollLeft;
      setTimeout(() => {
        isSyncingRef.current = false;
      }, 0);
    }
  };

  const handleBoardScroll = () => {
    if (isSyncingRef.current) return;
    if (boardScrollRef.current && statsScrollRef.current) {
      isSyncingRef.current = true;
      statsScrollRef.current.scrollLeft = boardScrollRef.current.scrollLeft;
      setTimeout(() => {
        isSyncingRef.current = false;
      }, 0);
    }
  };

  const validColumnStatuses = useMemo(() => {
    return new Set(CASE_STATUS_PIPELINE.map(([key]) => key));
  }, []);

  return (
    <DragDropProvider
      onDragStart={() => setDraggedCaseId("dragging")}
      onDragEnd={(event) => {
        setDraggedCaseId(null);
        const { operation } = event;
        if (!operation) return;

        const { source, target } = operation;
        if (!source || !target) return;

        const targetColumnId = String(target.id);
        if (!validColumnStatuses.has(targetColumnId)) return;

        const sourceCaseId = String(source.id);
        const draggedCase = pipelineCases.find((c) => c.id === sourceCaseId);
        if (!draggedCase || draggedCase.status === targetColumnId) return;

        updateCase(sourceCaseId, { status: targetColumnId } as Partial<Case>);
      }}
    >
      <Box className="p-4 md:p-6 space-y-4">
        {/* Top stats cards */}
        <Box
          ref={statsScrollRef}
          className="overflow-x-auto pb-2 -mx-2 px-2"
          onScroll={handleStatsScroll}
        >
          <Grid
            container
            spacing={2}
            className="min-w-350 md:min-w-0 flex-nowrap md:flex-wrap"
          >
            {CASE_STATUS_PIPELINE.map(([statusKey, config]) => {
              const columnCases = sortCases(
                pipelineCases.filter((c) => c.status === statusKey),
              );
              const borderColor = getThemeColor(config.styling?.color);
              return (
                <Grid size={2.4} key={statusKey}>
                  <BaseCard
                    className="flex items-center border-l-6 hover:shadow-md hover:-translate-y-0.5"
                    style={{ borderLeftColor: borderColor }}
                  >
                    <Typography
                      variant="h5"
                      className="font-bold"
                      style={{ color: borderColor }}
                    >
                      {columnCases.length}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-xs text-gray-500 font-medium"
                    >
                      {config.label}
                    </Typography>
                  </BaseCard>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Kanban board */}
        <Box
          ref={boardScrollRef}
          className="overflow-x-auto pb-2 -mx-2 px-2"
          onScroll={handleBoardScroll}
        >
          <Grid
            container
            spacing={2}
            className="min-w-350 md:min-w-0 flex-nowrap md:flex-wrap"
          >
            {CASE_STATUS_PIPELINE.map(([statusKey, config]) => {
              const columnCases = sortCases(
                pipelineCases.filter((c) => c.status === statusKey),
              );
              return (
                <Grid size={2.4} key={statusKey}>
                  <DroppableColumn
                    id={statusKey}
                    className={`
                      rounded-xl p-2 transition-all duration-200 h-full
                      ${
                        draggedCaseId
                          ? "border-2 border-dashed border-blue-400 bg-blue-50/30"
                          : "border-2 border-dashed border-transparent bg-white/60"
                      }
                    `}
                  >
                    {columnCases.length > 0 ? (
                      columnCases.map((c) => (
                        <CaseCard key={c.id} caseItem={c} />
                      ))
                    ) : (
                      <Box className="flex flex-col items-center justify-center py-8 md:py-12 text-gray-400">
                        <BusinessCenter className="text-4xl mb-1 opacity-50" />
                        <Typography
                          variant="body2"
                          className="text-xs md:text-sm font-medium mb-1"
                        >
                          No cases in {config.label.toLowerCase()}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-xs text-center"
                        >
                          Drag a case here to move it
                        </Typography>
                      </Box>
                    )}
                  </DroppableColumn>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </DragDropProvider>
  );
}
