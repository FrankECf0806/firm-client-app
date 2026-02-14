import { useState, useCallback, useMemo } from "react";
import { Client, CreateClientInput } from "@/types/client";
import { mockClients } from "@/mock_data";

export function useClients() {
  const [clients, setClients] = useState<Client[]>(mockClients);

  const resetClients = useCallback(() => {
    setClients(mockClients);
  }, []);

  const clientsMap = useMemo(
    () => new Map(clients.map((c) => [c.id, c])),
    [clients],
  );

  const clientNamesMap = useMemo(
    () =>
      new Map(
        clients.map((c) => [c.id, `${c.firstName} ${c.lastName}`.trim()]),
      ),
    [clients],
  );

  const addClient = useCallback((input: CreateClientInput) => {
    const now = new Date().toISOString();
    const newClient: Client = {
      ...input,
      id: Date.now().toString(),
      casesCount: 0,
      status: "ACTIVE",
      notes: [],
      createdAt: now,
      updatedAt: now,
    };
    setClients((prev) => [...prev, newClient]);
    return newClient;
  }, []);

  const updateClient = useCallback((id: string, updates: Partial<Client>) => {
    const now = new Date().toISOString();
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: now } : c)),
    );
  }, []);

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
          client.company?.toLowerCase().includes(searchTerm) ||
          client.email?.toLowerCase().includes(searchTerm)
        );
      });
    },
    [clients],
  );

  const getClientsByStatus = useCallback(
    (status: string) => clients.filter((c) => c.status === status),
    [clients],
  );

  const getClientsByType = useCallback(
    (type: string) => clients.filter((c) => c.type === type),
    [clients],
  );

  return {
    clients,
    clientsMap,
    clientNamesMap,
    addClient,
    updateClient,
    deleteClient,
    getClientById,
    getClientsByName,
    getClientsByStatus,
    getClientsByType,
    resetClients,
  };
}
