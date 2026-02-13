/** Base Document - shared fields for forms and creation */
export interface DocumentBase {
  name: string;
  caseId: string;
  caseName: string;
  type: string;
  description?: string;
}

// Form values - extends base with file for upload
export type DocumentFormValues = Omit<DocumentBase, "name" | "caseName"> & {
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
