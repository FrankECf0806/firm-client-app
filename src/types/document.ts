import { ALL_DOCUMENT_TYPES } from "@/utils/constant/document";

/** Base Document - shared fields for forms and creation */
export interface DocumentBase {
  name: string;
  caseId: string;
  clientId: string;
  type: string;
  description?: string;
}

// Form values - extends base with file for upload
export type DocumentFormValues = Omit<DocumentBase, "name" | "caseId"> & {
  file?: File;
};

// Create input (same as base)
export type CreateDocumentInput = DocumentBase;

/** Full Document Entity - stored in AppProvider */
export interface Document extends DocumentBase {
  id: string;
  uploadDate: string;
  size: string;
}

// Document type filter for UI
export type DocumentTypeKey = string; // "PDF" | "DOC" | "XLS" | etc.
export type DocumentTypeFilter = DocumentTypeKey | typeof ALL_DOCUMENT_TYPES;
