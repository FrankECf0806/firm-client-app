import { useState, useCallback } from "react";
import { Communication, CreateCommunicationInput } from "@/types/communication";
import { mockCommunications } from "@/mock_data";

export function useCommunications() {
  const [communications, setCommunications] =
    useState<Communication[]>(mockCommunications);

  const resetCommunications = useCallback(() => {
    setCommunications(mockCommunications);
  }, []);

  const addCommunication = useCallback((input: CreateCommunicationInput) => {
    const now = new Date().toISOString();
    const newCommunication: Communication = {
      ...input,
      id: Date.now().toString(),
      status: "UNREAD",
      unread: true,
      time: "Just now",
      createdAt: now,
      updatedAt: now,
    };
    setCommunications((prev) => [newCommunication, ...prev]);
    return newCommunication;
  }, []);

  const updateCommunication = useCallback(
    (id: string, updates: Partial<Communication>) => {
      setCommunications((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                ...updates,
                updatedAt: new Date().toISOString(),
                ...(updates.unread === false && { status: "READ" }),
                ...(updates.unread === true && { status: "UNREAD" }),
              }
            : c,
        ),
      );
    },
    [],
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

  const markAsRead = useCallback((id: string) => {
    setCommunications((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              unread: false,
              status: "READ",
              updatedAt: new Date().toISOString(),
            }
          : c,
      ),
    );
  }, []);

  const markAsUnread = useCallback((id: string) => {
    setCommunications((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              unread: true,
              status: "UNREAD",
              updatedAt: new Date().toISOString(),
            }
          : c,
      ),
    );
  }, []);

  const archiveCommunication = useCallback((id: string) => {
    setCommunications((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "ARCHIVED", updatedAt: new Date().toISOString() }
          : c,
      ),
    );
  }, []);

  return {
    communications,
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
    resetCommunications,
  };
}
