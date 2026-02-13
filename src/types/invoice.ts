import { InvoiceStatus } from "@/enums/invoice";

export type InvoiceStatusKey = keyof typeof InvoiceStatus;

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

/** Base Invoice - shared fields for forms and creation */
export interface InvoiceBase {
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  caseId?: string;
  caseName?: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate?: number;
  taxAmount?: number;
  total: number;
  notes?: string;
}

// Form values (same as base)
export type InvoiceFormValues = InvoiceBase;

// Create input (same as base)
export type CreateInvoiceInput = InvoiceBase;

/** Full Invoice Entity - stored in AppProvider */
export interface Invoice extends InvoiceBase {
  id: string;
  status: InvoiceStatusKey;
  paidDate?: string;
  createdAt: string;
  updatedAt?: string;
}
