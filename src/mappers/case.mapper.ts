import { Case, CaseFormValues } from "@/types/case";

export function caseToFormValues(caseItem: Case): CaseFormValues {
  return {
    id: caseItem.id, // ✅ Include the ID for edit mode
    title: caseItem.title,
    clientId: caseItem.clientId,
    practiceArea: caseItem.practiceArea,
    status: caseItem.status,
    priority: caseItem.priority,
    openedAt: caseItem.openedAt,
    nextDeadline: caseItem.nextDeadline ?? "",
    description: caseItem.description ?? "",
  };
}

export function formValuesToCaseUpdate(
  caseItem: CaseFormValues,
): Partial<Case> {
  return {
    title: caseItem.title,
    clientId: caseItem.clientId,
    practiceArea: caseItem.practiceArea,
    priority: caseItem.priority,
    status: "ACTIVE",
    openedAt: caseItem.openedAt,
    nextDeadline: caseItem.nextDeadline || undefined,
    description: caseItem.description || undefined,
  };
}
