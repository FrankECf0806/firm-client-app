import { useState, useCallback } from "react";
import { Invoice } from "@/types/invoice";
import { mockInvoices } from "@/mock_data";

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);

  const resetInvoices = useCallback(() => {
    setInvoices(mockInvoices);
  }, []);

  const addInvoice = useCallback((invoice: Invoice) => {
    const now = new Date().toISOString();
    setInvoices((prev) => [
      ...prev,
      {
        ...invoice,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      },
    ]);
  }, []);

  const updateInvoice = useCallback((id: string, updates: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? { ...inv, ...updates, updatedAt: new Date().toISOString() }
          : inv,
      ),
    );
  }, []);

  const deleteInvoice = useCallback((id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  }, []);

  const getInvoiceById = useCallback(
    (id: string) => invoices.find((inv) => inv.id === id),
    [invoices],
  );

  const getInvoicesByClient = useCallback(
    (clientId: string) => invoices.filter((inv) => inv.clientId === clientId),
    [invoices],
  );

  const getInvoicesByCase = useCallback(
    (caseId: string) => invoices.filter((inv) => inv.caseId === caseId),
    [invoices],
  );

  const getInvoicesByStatus = useCallback(
    (status: string) => invoices.filter((inv) => inv.status === status),
    [invoices],
  );

  return {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById,
    getInvoicesByClient,
    getInvoicesByCase,
    getInvoicesByStatus,
    resetInvoices,
  };
}
