import { ALL_DOCUMENT_TYPES } from "@/utils/constant/document";
import {
  DocumentType,
  FileExtension,
  FileExtensionGroup,
} from "@/enums/document";

export type DocumentTypeKey = keyof typeof DocumentType; // "CONTRACT" | "PLEADING" | "MOTION" | "BRIEF" | "CORRESPONDENCE" | "EVIDENCE" | "COURT_ORDER" | "OTHER"
export type FileExtensionKey = keyof typeof FileExtension; // "PDF" | "DOC" | "DOCX" | "XLS" | "XLSX" | "JPG" | "JPEG" | "PNG" | "TXT" | "DEFAULT"

export type FileExtensionFilter = FileExtensionKey | typeof ALL_DOCUMENT_TYPES; // "ALL_TYPES" | "PDF" | "DOC" | "DOCX" | "XLS" | "XLSX" | "JPG" | "JPEG" | "PNG" | "TXT" | "DEFAULT"
export type FileExtensionGroupKey = keyof typeof FileExtensionGroup; // "OTHER" | "PDF" | "WORD" | "EXCEL" | "IMAGE" | "TEXT"

export type FileExtensionGroupFilter =
  | FileExtensionGroupKey
  | typeof ALL_DOCUMENT_TYPES; // ALL_TYPES" | "WORD" | "PDF" | "EXCEL" | "IMAGE" | "TEXT" | "OTHER"

export interface DocumentBase {
  name: string;
  caseId: string;
  clientId: string;
  type: DocumentTypeKey;
  description?: string;
  isStarred?: boolean;
}

export interface DocumentFormValues extends DocumentBase {
  file?: File;
}

export type CreateDocumentInput = DocumentBase;

export interface Document extends DocumentBase {
  id: string;
  size: string;
  createdAt: string;
  updatedAt: string;
}

export type TableDocumentSortKey =
  | "name"
  | "size"
  | "createdAt"
  | "caseId"
  | "fileExt";
