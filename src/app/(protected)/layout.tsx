"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";
import { AppProvider } from "@/providers/AppProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AppProvider>
        <AppShell>{children}</AppShell>
      </AppProvider>
    </ProtectedRoute>
  );
}
