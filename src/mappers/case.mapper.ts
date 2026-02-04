import { Case, CaseFormValues } from "@/types/case";

export function caseToFormValues(caseItem: Case): CaseFormValues {
  return {
    title: caseItem.title,
    client: caseItem.clientId,
    practiceArea: caseItem.practiceArea,
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
    clientId: caseItem.client,
    practiceArea: caseItem.practiceArea,
    priority: caseItem.priority,
    openedAt: caseItem.openedAt,
    nextDeadline: caseItem.nextDeadline || undefined,
    description: caseItem.description || undefined,
  };
}
