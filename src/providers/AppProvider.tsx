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
  mockCommunications,
} from "@/mock_data";

import { Invoice } from "@/types/invoice";
import { Case, CreateCaseInput } from "@/types/case";
import { Client, CreateClientInput } from "@/types/client";
import {
  Document as CaseDocument,
  CreateDocumentInput,
} from "@/types/document";
import { Meeting, CreateMeetingInput } from "@/types/meeting";
import { Note } from "@/types/note";
import { Task, CreateTaskInput } from "@/types/task";
import { Communication, CreateCommunicationInput } from "@/types/communication";

interface AppContextType {
  // State
  invoices: Invoice[];
  cases: Case[];
  clients: Client[];
  documents: CaseDocument[];
  meetings: Meeting[];
  tasks: Task[];
  communications: Communication[];
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
  addCase: (input: CreateCaseInput) => Case;
  updateCase: (id: string, updates: Partial<Case>) => void;
  deleteCase: (id: string) => void;
  getCaseById: (id: string) => Case | undefined;
  addCaseNote: (caseId: string, note: Note) => void;
  getCasesByClientId: (clientId: string) => Case[];

  // Clients
  addClient: (input: CreateClientInput) => Client;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
  getClientsByName: (name: string) => Client[];

  // Documents
  addDocument: (input: CreateDocumentInput) => CaseDocument;
  updateDocument: (id: string, updates: Partial<CaseDocument>) => void;
  deleteDocument: (id: string) => void;
  getDocumentsByCase: (caseId: string) => CaseDocument[];

  // Meetings
  addMeeting: (input: CreateMeetingInput) => Meeting;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  getMeetingsByCase: (caseId: string) => Meeting[];

  // Tasks
  addTask: (input: CreateTaskInput) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  getTasksByCase: (caseId: string) => Task[];

  // Communications
  addCommunication: (input: CreateCommunicationInput) => Communication;
  updateCommunication: (id: string, updates: Partial<Communication>) => void;
  deleteCommunication: (id: string) => void;
  getCommunicationById: (id: string) => Communication | undefined;
  getCommunicationsByClient: (clientId: string) => Communication[];
  getCommunicationsByCase: (caseId: string) => Communication[];
  getUnreadCommunications: () => Communication[];
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  archiveCommunication: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [documents, setDocuments] = useState<CaseDocument[]>(mockDocuments);
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [communications, setCommunications] =
    useState<Communication[]>(mockCommunications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============ Utility Functions ============
  const generateId = useCallback(() => Date.now().toString(), []);
  const getCurrentISOString = useCallback(() => new Date().toISOString(), []);

  // Refetch function (for future API integration)
  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setInvoices(mockInvoices);
      setCases(mockCases);
      setClients(mockClients);
      setDocuments(mockDocuments);
      setMeetings(mockMeetings);
      setTasks(mockTasks);
      setCommunications(mockCommunications);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ============ Client Operations ============
  const addClient = useCallback(
    (input: CreateClientInput) => {
      const now = getCurrentISOString();
      const newClient: Client = {
        ...input,
        id: generateId(),
        casesCount: 0,
        status: "ACTIVE",
        notes: [],
        createdAt: now,
        updatedAt: now,
      };
      setClients((prev) => [...prev, newClient]);
      return newClient;
    },
    [generateId, getCurrentISOString],
  );

  const updateClient = useCallback(
    (id: string, updates: Partial<Client>) => {
      setClients((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, ...updates, updatedAt: getCurrentISOString() }
            : c,
        ),
      );
    },
    [getCurrentISOString],
  );

  const deleteClient = useCallback((id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getClientById = useCallback(
    (id: string) => clients.find((c) => c.id === id),
    [clients],
  );

  const getClientsByName = useCallback(
    (name: string) => {
      const searchTerm = name.toLowerCase();
      return clients.filter((client) => {
        const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
        return (
          fullName.includes(searchTerm) ||
          client.company?.toLowerCase().includes(searchTerm)
        );
      });
    },
    [clients],
  );

  // ============ Case Operations ============
  const addCase = useCallback(
    (input: CreateCaseInput) => {
      const client = clients.find((c) => c.id === input.clientId);
      const now = getCurrentISOString();

      // Compute client name on the fly
      const clientName = client
        ? `${client.firstName} ${client.lastName}`.trim()
        : "Unknown Client";

      const newCase: Case = {
        ...input,
        id: generateId(),
        client: clientName,
        status: "ACTIVE",
        notes: [],
      };
      setCases((prev) => [...prev, newCase]);

      // Increment client's casesCount
      if (client) {
        setClients((prev) =>
          prev.map((c) =>
            c.id === client.id
              ? { ...c, casesCount: c.casesCount + 1, updatedAt: now }
              : c,
          ),
        );
      }
      return newCase;
    },
    [clients, generateId, getCurrentISOString],
  );

  const updateCase = useCallback((id: string, updates: Partial<Case>) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  }, []);

  const deleteCase = useCallback((id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getCaseById = useCallback(
    (id: string) => cases.find((c) => c.id === id),
    [cases],
  );

  const addCaseNote = useCallback(
    (caseId: string, note: Note) => {
      const now = getCurrentISOString();
      setCases((prev) =>
        prev.map((c) =>
          c.id === caseId
            ? {
                ...c,
                notes: [
                  { ...note, id: generateId(), createdAt: now },
                  ...(c.notes || []),
                ],
              }
            : c,
        ),
      );
    },
    [generateId, getCurrentISOString],
  );

  const getCasesByClientId = useCallback(
    (clientId: string) => cases.filter((c) => c.clientId === clientId),
    [cases],
  );

  // ============ Document Operations ============
  const addDocument = useCallback(
    (input: CreateDocumentInput) => {
      const now = getCurrentISOString();
      const newDocument: CaseDocument = {
        ...input,
        id: crypto.randomUUID(),
        uploadDate: now,
        size: "0 MB",
      };
      setDocuments((prev) => [...prev, newDocument]);
      return newDocument;
    },
    [getCurrentISOString],
  );

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
    (caseId: string) => documents.filter((d) => d.caseId === caseId),
    [documents],
  );

  // ============ Meeting Operations ============
  const addMeeting = useCallback(
    (input: CreateMeetingInput) => {
      const now = getCurrentISOString();
      const newMeeting: Meeting = {
        ...input,
        id: generateId(),
        status: "SCHEDULED",
        createdAt: now,
        updatedAt: now,
      };
      setMeetings((prev) => [...prev, newMeeting]);
      return newMeeting;
    },
    [generateId, getCurrentISOString],
  );

  const updateMeeting = useCallback(
    (id: string, updates: Partial<Meeting>) => {
      setMeetings((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, ...updates, updatedAt: getCurrentISOString() }
            : m,
        ),
      );
    },
    [getCurrentISOString],
  );

  const deleteMeeting = useCallback((id: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const getMeetingsByCase = useCallback(
    (caseId: string) => meetings.filter((m) => m.caseId === caseId),
    [meetings],
  );

  // ============ Task Operations ============
  const addTask = useCallback(
    (input: CreateTaskInput) => {
      const now = getCurrentISOString();
      const newTask: Task = {
        ...input,
        id: generateId(),
        status: "TODO",
        completed: false,
        createdAt: now,
        updatedAt: now,
      };
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    },
    [generateId, getCurrentISOString],
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, ...updates, updatedAt: getCurrentISOString() }
            : t,
        ),
      );
    },
    [getCurrentISOString],
  );

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                completed: !t.completed,
                status: !t.completed ? "DONE" : "TODO",
                updatedAt: getCurrentISOString(),
              }
            : t,
        ),
      );
    },
    [getCurrentISOString],
  );

  const getTasksByCase = useCallback(
    (caseId: string) => tasks.filter((t) => t.caseId === caseId),
    [tasks],
  );

  // ============ Invoice Operations ============
  const addInvoice = useCallback(
    (invoice: Invoice) => {
      const now = getCurrentISOString();
      setInvoices((prev) => [
        ...prev,
        {
          ...invoice,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        },
      ]);
    },
    [generateId, getCurrentISOString],
  );

  const updateInvoice = useCallback(
    (id: string, updates: Partial<Invoice>) => {
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === id
            ? { ...inv, ...updates, updatedAt: getCurrentISOString() }
            : inv,
        ),
      );
    },
    [getCurrentISOString],
  );

  const deleteInvoice = useCallback(
    (id: string) => setInvoices((prev) => prev.filter((inv) => inv.id !== id)),
    [],
  );

  const getInvoiceById = useCallback(
    (id: string) => invoices.find((inv) => inv.id === id),
    [invoices],
  );

  // ============ Communication Operations ============
  const addCommunication = useCallback(
    (input: CreateCommunicationInput) => {
      const now = getCurrentISOString();
      const newCommunication: Communication = {
        ...input,
        id: generateId(),
        status: "UNREAD",
        unread: true,
        time: "Just now",
        createdAt: now,
        updatedAt: now,
      };
      setCommunications((prev) => [newCommunication, ...prev]);
      return newCommunication;
    },
    [generateId, getCurrentISOString],
  );

  const updateCommunication = useCallback(
    (id: string, updates: Partial<Communication>) => {
      setCommunications((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                ...updates,
                updatedAt: getCurrentISOString(),
                ...(updates.unread === false && { status: "READ" }),
                ...(updates.unread === true && { status: "UNREAD" }),
              }
            : c,
        ),
      );
    },
    [getCurrentISOString],
  );

  const deleteCommunication = useCallback((id: string) => {
    setCommunications((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getCommunicationById = useCallback(
    (id: string) => communications.find((c) => c.id === id),
    [communications],
  );

  const getCommunicationsByClient = useCallback(
    (clientId: string) => communications.filter((c) => c.clientId === clientId),
    [communications],
  );

  const getCommunicationsByCase = useCallback(
    (caseId: string) => communications.filter((c) => c.caseId === caseId),
    [communications],
  );

  const getUnreadCommunications = useCallback(
    () => communications.filter((c) => c.unread),
    [communications],
  );

  const markAsRead = useCallback(
    (id: string) => {
      setCommunications((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                unread: false,
                status: "READ",
                updatedAt: getCurrentISOString(),
              }
            : c,
        ),
      );
    },
    [getCurrentISOString],
  );

  const markAsUnread = useCallback(
    (id: string) => {
      setCommunications((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                unread: true,
                status: "UNREAD",
                updatedAt: getCurrentISOString(),
              }
            : c,
        ),
      );
    },
    [getCurrentISOString],
  );

  const archiveCommunication = useCallback(
    (id: string) => {
      setCommunications((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, status: "ARCHIVED", updatedAt: getCurrentISOString() }
            : c,
        ),
      );
    },
    [getCurrentISOString],
  );

  const value: AppContextType = {
    // State
    invoices,
    cases,
    clients,
    documents,
    meetings,
    tasks,
    communications,
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

    // Invoice
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById,

    // Communication
    addCommunication,
    updateCommunication,
    deleteCommunication,
    getCommunicationById,
    getCommunicationsByClient,
    getCommunicationsByCase,
    getUnreadCommunications,
    markAsRead,
    markAsUnread,
    archiveCommunication,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook for easy access
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
