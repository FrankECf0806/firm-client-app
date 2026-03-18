"use client";

import { useParams } from "next/navigation";
import { CasesManager } from "@/components/cases/CasesManager";

export default function ClientCasesPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  return (
    <CasesManager
      clientId={clientId}
      searchPlaceholder="Search client cases..."
    />
  );
}
