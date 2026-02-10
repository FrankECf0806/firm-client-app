"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  mockInvoices,
  mockCases,
  mockClients,
  mockDocuments,
  mockMeetings,
  mockTasks,
} from "@/mock_data";

import { Invoice } from "@/types/invoice";
import { Case } from "@/types/case";
import { Client } from "@/types/client";
import { Document as CaseDocument } from "@/types/document";
import { Meeting } from "@/types/meeting";
import { Note } from "@/types/note";
import { Task } from "@/types/task";

interface AppContextType {
  // State
  invoices: Invoice[];
  cases: Case[];
  clients: Client[];
  documents: CaseDocument[];
  meetings: Meeting[];
  tasks: Task[];
  loading: boolean;
  error: string | null;

  // Operations
  refetch: () => Promise<void>;

  // Invoices
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  getInvoiceById: (id: string) => Invoice | undefined;

  // Cases
  addCase: (caseData: Case) => void;
  updateCase: (id: string, updates: Partial<Case>) => void;
  deleteCase: (id: string) => void;
  getCaseById: (id: string) => Case | undefined;
  addCaseNote: (caseId: string, note: Note) => void;
  getCasesByClientId: (clientId: string) => Case[];

  // Clients
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
  getClientsByName: (name: string) => Client[];

  // Documents
  addDocument: (doc: CaseDocument) => void;
  updateDocument: (id: string, updates: Partial<CaseDocument>) => void;
  deleteDocument: (id: string) => void;
  getDocumentsByCase: (caseId: string) => CaseDocument[];

  // Meetings
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  getMeetingsByCase: (caseId: string) => Meeting[];

  // Tasks
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  getTasksByCase: (caseId: string) => Task[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [documents, setDocuments] = useState<CaseDocument[]>(mockDocuments);
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refetch function (for future API integration)
  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Reset to mock data
      setInvoices(mockInvoices);
      setCases(mockCases);
      setClients(mockClients);
      setDocuments(mockDocuments);
      setMeetings(mockMeetings);
      setTasks(mockTasks);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Client operations
  const addClient = useCallback((client: Client) => {
    setClients((prev) => [...prev, client]);
  }, []);

  const updateClient = useCallback((id: string, updates: Partial<Client>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  }, []);

  const deleteClient = useCallback((id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getClientById = useCallback(
    (id: string) => {
      return clients.find((c) => c.id === id);
    },
    [clients],
  );

  const getClientsByName = useCallback(
    (name: string) => {
      const searchTerm = name.toLowerCase();
      return clients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm) ||
          client.company?.toLowerCase().includes(searchTerm),
      );
    },
    [clients],
  );

  // Case operations
  const addCase = useCallback((caseData: Case) => {
    setCases((prev) => [...prev, caseData]);
  }, []);

  const updateCase = useCallback((id: string, updates: Partial<Case>) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  }, []);

  const deleteCase = useCallback((id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getCaseById = useCallback(
    (id: string) => {
      return cases.find((c) => c.id === id);
    },
    [cases],
  );

  const addCaseNote = useCallback((caseId: string, note: Note) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId ? { ...c, notes: [note, ...(c.notes || [])] } : c,
      ),
    );
  }, []);

  const getCasesByClientId = useCallback(
    (clientId: string) => {
      return cases.filter((c) => c.clientId === clientId);
    },
    [cases],
  );

  // Document operations
  const addDocument = useCallback((doc: CaseDocument) => {
    setDocuments((prev) => [...prev, doc]);
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

  const getDocumentsByCase = useCallback(
    (caseId: string) => {
      return documents.filter((d) => d.caseId === caseId);
    },
    [documents],
  );

  // Meeting operations
  const addMeeting = useCallback((meeting: Meeting) => {
    setMeetings((prev) => [...prev, meeting]);
  }, []);

  const updateMeeting = useCallback((id: string, updates: Partial<Meeting>) => {
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    );
  }, []);

  const deleteMeeting = useCallback((id: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const getMeetingsByCase = useCallback(
    (caseId: string) => {
      return meetings.filter((m) => m.caseId === caseId);
    },
    [meetings],
  );

  // Task operations
  const addTask = useCallback((task: Task) => {
    setTasks((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const getTasksByCase = useCallback(
    (caseId: string) => {
      return tasks.filter((t) => t.caseId === caseId);
    },
    [tasks],
  );

  const value: AppContextType = {
    // State
    invoices,
    cases,
    clients,
    documents,
    meetings,
    tasks,
    loading,
    error,

    // Operations
    refetch,

    // Client
    addClient,
    updateClient,
    deleteClient,
    getClientById,
    getClientsByName,

    // Case
    addCase,
    updateCase,
    deleteCase,
    getCaseById,
    addCaseNote,
    getCasesByClientId,

    // Document
    addDocument,
    updateDocument,
    deleteDocument,
    getDocumentsByCase,

    // Meeting
    addMeeting,
    updateMeeting,
    deleteMeeting,
    getMeetingsByCase,

    // Task
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTasksByCase,

    // Invoice (keep your existing)
    addInvoice: (invoice: Invoice) => setInvoices((prev) => [...prev, invoice]),
    updateInvoice: (id: string, updates: Partial<Invoice>) =>
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === id ? { ...inv, ...updates } : inv)),
      ),
    deleteInvoice: (id: string) =>
      setInvoices((prev) => prev.filter((inv) => inv.id !== id)),
    getInvoiceById: (id: string) => invoices.find((inv) => inv.id === id),
  };

  return <AppContext value={value}>{children}</AppContext>;
}

// Custom hook for easy access
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
