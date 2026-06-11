"use client";

import { Box, Grid, Typography } from "@mui/material";
import {
  ALL_CASE_STATUS,
  CASE_PRIORITY_CONFIG,
  CASE_STATUS_PIPELINE,
} from "@/utils/constant/case";
import { useMemo, useState, useRef, useCallback } from "react";
import { useAppContext } from "@/providers/AppProvider";
import { ResettableSelect } from "@/components/ui/input/ResettableSelect";
import { BusinessCenter } from "@mui/icons-material";
import { CaseCard } from "@/components/card/cases/CaseCard";
import { DroppableColumn } from "@/components/card/cases/DroppableColumn";
import { useHelperFunctions } from "@/utils/helper/global";
import { Case } from "@/types/case";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { CasePracticeArea } from "@/enums/case";

export default function CasesPipelinePage() {
  const [filterArea, setFilterArea] = useState(ALL_CASE_STATUS);

  const { cases, clients } = useAppContext();
  const { getThemeColor } = useHelperFunctions();

  const boardScrollRef = useRef<HTMLDivElement>(null);

  const { cases: casesList, updateCase } = cases;
  const { getClientById } = clients;

  const [isDragging, setIsDragging] = useState(false);

  /**
   * Priority ranking
   */
  const PRIORITY_ORDER = useMemo(() => {
    return Object.keys(CASE_PRIORITY_CONFIG).filter(
      (k) => k !== ALL_CASE_STATUS && k !== "ALL_CASE_PRIORITY",
    );
  }, []);

  const sortedPriorityKeys = useMemo(
    () => [...PRIORITY_ORDER].reverse(),
    [PRIORITY_ORDER],
  );

  const getPriorityRank = useCallback(
    (priority?: string): number => {
      if (!priority) return 999;
      const idx = sortedPriorityKeys.indexOf(priority.toUpperCase());
      return idx === -1 ? 999 : idx;
    },
    [sortedPriorityKeys],
  );

  const filteredCases = useMemo(() => {
    return casesList.filter(
      (c) => filterArea === ALL_CASE_STATUS || c.practiceArea === filterArea,
    );
  }, [casesList, filterArea]);

  const groupedCaseIds = useMemo(() => {
    const groups: Record<string, string[]> = {};

    for (const [status] of CASE_STATUS_PIPELINE) {
      groups[status] = [];
    }

    for (const c of filteredCases) {
      if (!groups[c.status]) continue;
      groups[c.status].push(c.id);
    }

    return groups;
  }, [filteredCases]);

  const caseById = useMemo(() => {
    const map = new Map<string, Case>();
    for (const c of casesList) {
      map.set(c.id, c);
    }
    return map;
  }, [casesList]);

  const getClientName = useCallback(
    (clientId: string) => {
      const client = getClientById(clientId);
      return `${client?.firstName ?? ""} ${client?.lastName ?? ""}`;
    },
    [getClientById],
  );

  const sortCaseIds = useCallback(
    (ids: string[]) => {
      return [...ids].sort((aId, bId) => {
        const a = caseById.get(aId)!;
        const b = caseById.get(bId)!;

        const aTime = a.nextDeadline
          ? new Date(a.nextDeadline).getTime()
          : Infinity;
        const bTime = b.nextDeadline
          ? new Date(b.nextDeadline).getTime()
          : Infinity;

        if (aTime !== bTime) return aTime - bTime;

        return getPriorityRank(a.priority) - getPriorityRank(b.priority);
      });
    },
    [caseById, getPriorityRank],
  );

  const sortedGroupedCaseIds = useMemo(() => {
    const result: Record<string, string[]> = {};

    for (const [status] of CASE_STATUS_PIPELINE) {
      result[status] = sortCaseIds(groupedCaseIds[status] || []);
    }

    return result;
  }, [groupedCaseIds, sortCaseIds]);

  /**
   * Drag state
   */
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setIsDragging(false);

      const { operation } = event;
      if (!operation) return;

      const { source, target } = operation;
      if (!source || !target) return;

      const targetColumnId = String(target.id);

      const sourceCaseId = String(source.id);

      const draggedCase = caseById.get(sourceCaseId);
      if (!draggedCase) return;

      if (draggedCase.status === targetColumnId) return;

      updateCase(sourceCaseId, {
        status: targetColumnId,
        optimistic: true,
      } as Partial<Case>);
    },
    [caseById, updateCase],
  );

  return (
    <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Grid
        container
        spacing={2}
        direction="row"
        className="justify-end items-start"
      >
        <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
          <ResettableSelect
            className="input-rounded-firm w-full"
            label="Practice Area"
            value={filterArea}
            onChange={setFilterArea}
            options={CasePracticeArea}
            resetValue={ALL_CASE_STATUS}
            resetLabel="All Practice Area"
          />
        </Grid>

        <Grid size={12}>
          <Box
            ref={boardScrollRef}
            className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 w-full kanban-scroll"
          >
            {CASE_STATUS_PIPELINE.map(([statusKey, config]) => {
              const columnIds = sortedGroupedCaseIds[statusKey] ?? [];

              const columnCases = columnIds.map((id) => caseById.get(id)!);

              const urgentCount = columnCases.filter(
                (c) => c.priority?.toUpperCase() === "URGENT",
              ).length;

              const borderColor = getThemeColor(config.styling?.color);

              return (
                <Box
                  key={statusKey}
                  className="
				  	shrink-0
					w-[90vw]
					sm:w-[48%]
					md:w-[32%]
					lg:flex-1
					lg:min-w-0
				  "
                >
                  <DroppableColumn
                    id={statusKey}
                    className={`
                      h-full rounded-xl p-2 transition-colors duration-150
                      ${
                        isDragging
                          ? "border-2 border-dashed border-blue-400 bg-blue-50/30"
                          : "border border-dashed border-slate-200 bg-slate-50"
                      }
                    `}
                  >
                    <Box
                      className="
						sticky 
						top-0 z-10
						bg-white
						rounded-t-2xl
						border-b border-slate-200
						px-4 py-3
						backdrop-blur"
                    >
                      <Box className="flex items-center justify-between">
                        <Box className="flex items-center gap-2">
                          <Box
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: borderColor }}
                          />
                          <Typography
                            variant="subtitle1"
                            className="font-semibold"
                          >
                            {config.label}
                          </Typography>
                        </Box>

                        <Box
                          className="min-w-8 h-6 px-2 rounded-full text-xs font-bold flex items-center justify-center"
                          style={{
                            backgroundColor: `${borderColor}20`,
                            color: borderColor,
                          }}
                        >
                          {columnCases.length}
                        </Box>
                      </Box>

                      {urgentCount > 0 && (
                        <Typography
                          variant="caption"
                          className="text-slate-500"
                        >
                          {urgentCount} urgent case
                          {urgentCount > 1 ? "s" : ""}
                        </Typography>
                      )}
                    </Box>

                    <Box
                      className={`
                        py-3 min-h-45 md:h-[calc(100vh-420px)]
                        overflow-y-auto overflow-x-hidden kanban-scroll
                        ${isDragging ? "bg-blue-50/30" : ""}
                      `}
                    >
                      {columnCases.length > 0 ? (
                        columnCases.map((c) => (
                          <CaseCard
                            key={c.id}
                            caseItem={{
                              ...c,
                              clientName: getClientName(c.clientId),
                            }}
                          />
                        ))
                      ) : (
                        <Box className="flex flex-col items-center justify-start text-center h-full rounded-xl text-slate-400 py-8">
                          <BusinessCenter
                            fontSize="large"
                            className="opacity-40 mb-2"
                          />
                          <Typography variant="body2" className="font-medium">
                            No {config.label.toLowerCase()} cases
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </DroppableColumn>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </DragDropProvider>
  );
}
