import { useState, useCallback } from "react";
import { Case, CreateCaseInput } from "@/types/case";
import { mockCases } from "@/mock_data";
import { Note } from "@/types/note";

export function useCases() {
  const [cases, setCases] = useState<Case[]>(mockCases);

  const resetCases = useCallback(() => {
    setCases(mockCases);
  }, []);

  const addCase = useCallback((input: CreateCaseInput) => {
    const now = new Date().toISOString();
    const newCase: Case = {
      ...input,
      id: Date.now().toString(),
      status: "ACTIVE",
      notes: [],
      createdAt: now,
      updatedAt: now,
    };
    setCases((prev) => [...prev, newCase]);
    return newCase;
  }, []);

  const updateCase = useCallback((id: string, updates: Partial<Case>) => {
    const now = new Date().toISOString();
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: now } : c)),
    );
  }, []);

  const deleteCase = useCallback((id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getCaseById = useCallback(
    (id: string) => cases.find((c) => c.id === id),
    [cases],
  );

  const addCaseNote = useCallback(
    (caseId: string, note: Omit<Note, "id" | "createdAt">) => {
      setCases((prev) =>
        prev.map((c) =>
          c.id === caseId
            ? {
                ...c,
                notes: [
                  {
                    ...note,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                  },
                  ...(c.notes || []),
                ],
              }
            : c,
        ),
      );
    },
    [],
  );

  const getCasesByClientId = useCallback(
    (clientId: string) => cases.filter((c) => c.clientId === clientId),
    [cases],
  );

  const getCasesByStatus = useCallback(
    (status: string) => cases.filter((c) => c.status === status),
    [cases],
  );

  const getCasesByPracticeArea = useCallback(
    (practiceArea: string) =>
      cases.filter((c) => c.practiceArea === practiceArea),
    [cases],
  );

  return {
    cases,
    addCase,
    updateCase,
    deleteCase,
    getCaseById,
    addCaseNote,
    getCasesByClientId,
    getCasesByStatus,
    getCasesByPracticeArea,
    resetCases,
  };
}
