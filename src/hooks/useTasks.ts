import { useState, useCallback } from "react";
import { Task, CreateTaskInput } from "@/types/task";
import { mockTasks } from "@/mock_data";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const resetTasks = useCallback(() => {
    setTasks(mockTasks);
  }, []);

  const addTask = useCallback((input: CreateTaskInput) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...input,
      id: Date.now().toString(),
      status: "TODO",
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updates, updatedAt: new Date().toISOString() }
          : t,
      ),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              status: !t.completed ? "DONE" : "TODO",
              updatedAt: new Date().toISOString(),
            }
          : t,
      ),
    );
  }, []);

  const getTaskById = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks],
  );

  const getTasksByCase = useCallback(
    (caseId: string) => tasks.filter((t) => t.caseId === caseId),
    [tasks],
  );

  const getTasksByAssignee = useCallback(
    (assignee: string) => tasks.filter((t) => t.assignedTo === assignee),
    [tasks],
  );

  const getPendingTasks = useCallback(
    () => tasks.filter((t) => !t.completed),
    [tasks],
  );

  const getCompletedTasks = useCallback(
    () => tasks.filter((t) => t.completed),
    [tasks],
  );

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTaskById,
    getTasksByCase,
    getTasksByAssignee,
    getPendingTasks,
    getCompletedTasks,
    resetTasks,
  };
}
