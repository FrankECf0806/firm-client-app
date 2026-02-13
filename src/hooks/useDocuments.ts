import { useState, useCallback } from "react";
import {
  Document as CaseDocument,
  CreateDocumentInput,
} from "@/types/document";
import { mockDocuments } from "@/mock_data";

export function useDocuments() {
  const [documents, setDocuments] = useState<CaseDocument[]>(mockDocuments);

  const resetDocuments = useCallback(() => {
    setDocuments(mockDocuments);
  }, []);

  const addDocument = useCallback((input: CreateDocumentInput) => {
    const now = new Date().toISOString();
    const newDocument: CaseDocument = {
      ...input,
      id: crypto.randomUUID(),
      uploadDate: now,
      size: "0 MB",
    };
    setDocuments((prev) => [...prev, newDocument]);
    return newDocument;
  }, []);

  const updateDocument = useCallback(
    (id: string, updates: Partial<CaseDocument>) => {
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...updates } : d)),
      );
    },
    [],
  );

  const deleteDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const getDocumentById = useCallback(
    (id: string) => documents.find((d) => d.id === id),
    [documents],
  );

  const getDocumentsByCase = useCallback(
    (caseId: string) => documents.filter((d) => d.caseId === caseId),
    [documents],
  );

  const getDocumentsByType = useCallback(
    (type: string) => documents.filter((d) => d.type === type),
    [documents],
  );

  return {
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
    getDocumentsByCase,
    getDocumentsByType,
    resetDocuments,
  };
}
