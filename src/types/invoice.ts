export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientId: string;
  caseReference: string;
  caseId: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "paid" | "unpaid" | "overdue";
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  hours: number;
  rate: number;
  amount: number;
}
