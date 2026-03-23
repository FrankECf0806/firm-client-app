"use client";

import { useParams } from "next/navigation";
import { DocumentsManager } from "@/components/documents/DocumentsManager";

export default function ClientDocumentsPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  return <DocumentsManager clientId={clientId} />;
}
