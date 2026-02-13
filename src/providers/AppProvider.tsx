"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
  useState,
} from "react";
import {
  useClients,
  useCases,
  useTasks,
  useDocuments,
  useMeetings,
  useInvoices,
  useCommunications,
} from "@/hooks";

interface AppContextType {
  // Clients
  clients: ReturnType<typeof useClients>;
  // Cases
  cases: ReturnType<typeof useCases>;
  // Tasks
  tasks: ReturnType<typeof useTasks>;
  // Documents
  documents: ReturnType<typeof useDocuments>;
  // Meetings
  meetings: ReturnType<typeof useMeetings>;
  // Invoices
  invoices: ReturnType<typeof useInvoices>;
  // Communications
  communications: ReturnType<typeof useCommunications>;
  // Global state
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize each entity hook
  const clients = useClients();
  const cases = useCases();
  const tasks = useTasks();
  const documents = useDocuments();
  const meetings = useMeetings();
  const invoices = useInvoices();
  const communications = useCommunications();

  // Global loading state for refetch
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refetch function - resets all data to mock data
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Reset all hooks to their mock data
      clients.resetClients();
      cases.resetCases();
      tasks.resetTasks();
      documents.resetDocuments();
      meetings.resetMeetings();
      invoices.resetInvoices();
      communications.resetCommunications();

      console.log("All data has been reset to mock data");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refetch data");
      console.error("Refetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [clients, cases, tasks, documents, meetings, invoices, communications]);

  // Enhance cases with client name lookup and cross-entity relationships
  const enhancedCases = useMemo(
    () => ({
      ...cases,
      addCase: (input: Parameters<typeof cases.addCase>[0]) => {
        const newCase = cases.addCase(input);

        // Find client and update case with client name
        const client = clients.clients.find((c) => c.id === input.clientId);
        if (client) {
          const clientName = `${client.firstName} ${client.lastName}`.trim();
          cases.updateCase(newCase.id, { client: clientName });

          // Increment client's casesCount
          clients.updateClient(client.id, {
            casesCount: client.casesCount + 1,
          });
        }
        return newCase;
      },

      // Override deleteCase to also handle related data
      deleteCase: (id: string) => {
        // Delete the case
        cases.deleteCase(id);

        // Also delete related documents, meetings, tasks, etc.
        documents.getDocumentsByCase(id).forEach((doc) => {
          documents.deleteDocument(doc.id);
        });

        meetings.getMeetingsByCase(id).forEach((meeting) => {
          meetings.deleteMeeting(meeting.id);
        });

        tasks.getTasksByCase(id).forEach((task) => {
          tasks.deleteTask(task.id);
        });

        communications.getCommunicationsByCase(id).forEach((comm) => {
          communications.deleteCommunication(comm.id);
        });
      },
    }),
    [cases, clients, documents, meetings, tasks, communications],
  );

  const value: AppContextType = {
    clients,
    cases: enhancedCases,
    tasks,
    documents,
    meetings,
    invoices,
    communications,
    loading,
    error,
    refetch,
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
