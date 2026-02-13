export enum InvoiceStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  VIEWED = "VIEWED",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
  DISPUTED = "DISPUTED",
}

// Optional: Display labels for UI
export const InvoiceStatusLabels: Record<InvoiceStatus, string> = {
  [InvoiceStatus.DRAFT]: "Draft",
  [InvoiceStatus.SENT]: "Sent",
  [InvoiceStatus.VIEWED]: "Viewed",
  [InvoiceStatus.PARTIALLY_PAID]: "Partially Paid",
  [InvoiceStatus.PAID]: "Paid",
  [InvoiceStatus.OVERDUE]: "Overdue",
  [InvoiceStatus.CANCELLED]: "Cancelled",
  [InvoiceStatus.REFUNDED]: "Refunded",
  [InvoiceStatus.DISPUTED]: "Disputed",
};

// Optional: Colors for UI badges
export const InvoiceStatusColors: Record<InvoiceStatus, string> = {
  [InvoiceStatus.DRAFT]: "default",
  [InvoiceStatus.SENT]: "info",
  [InvoiceStatus.VIEWED]: "info",
  [InvoiceStatus.PARTIALLY_PAID]: "warning",
  [InvoiceStatus.PAID]: "success",
  [InvoiceStatus.OVERDUE]: "error",
  [InvoiceStatus.CANCELLED]: "secondary",
  [InvoiceStatus.REFUNDED]: "secondary",
  [InvoiceStatus.DISPUTED]: "error",
};

// Optional: Payment terms in days
export const InvoicePaymentTerms = {
  NET_15: 15,
  NET_30: 30,
  NET_45: 45,
  NET_60: 60,
  DUE_ON_RECEIPT: 0,
} as const;

export type InvoicePaymentTermKey = keyof typeof InvoicePaymentTerms;

export const InvoicePaymentTermLabels: Record<InvoicePaymentTermKey, string> = {
  NET_15: "Net 15",
  NET_30: "Net 30",
  NET_45: "Net 45",
  NET_60: "Net 60",
  DUE_ON_RECEIPT: "Due on Receipt",
};
