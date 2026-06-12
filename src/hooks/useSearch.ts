import { useMemo } from "react";
import { Case } from "@/types/case";
import { Client } from "@/types/client";
import { SearchResult } from "@/types/ui/search";

const MIN_SEARCH_LENGTH = 3;

function normalize(value?: string | null): string {
  return value?.toLowerCase().trim() ?? "";
}

function scoreField(field: string | undefined, query: string): number {
  if (!field) return 0;
  const value = normalize(field);
  if (value === query) return 100;
  if (value.startsWith(query)) return 50;
  if (value.includes(query)) return 20;
  return 0;
}

interface UseGlobalSearchProps {
  query: string;
  cases: Case[];
  clients: Client[];
}

export function useGlobalSearch({
  query,
  cases,
  clients,
}: UseGlobalSearchProps): SearchResult[] {
  return useMemo(() => {
    const q = normalize(query);
    if (q.length < MIN_SEARCH_LENGTH) return [];

    const results: SearchResult[] = [];

    // Search cases
    for (const c of cases) {
      let score = 0;
      score += scoreField(c.id, q);
      score += scoreField(c.title, q);
      score += scoreField(c.description, q);
      score += scoreField(c.clientId, q);
      score += scoreField(c.status, q);
      score += scoreField(c.priority, q);
      score += scoreField(c.practiceArea, q);
      score += scoreField(c.nextDeadline, q);

      if (score > 0) {
        results.push({
          id: c.id,
          type: "case",
          title: c.title,
          subtitle: c.description,
          href: `/cases/${c.id}`,
          score,
        });
      }
    }

    // Search clients
    for (const client of clients) {
      let score = 0;
      score += scoreField(client.id, q);
      score += scoreField(client.firstName, q);
      score += scoreField(client.lastName, q);
      score += scoreField(client.company, q);
      score += scoreField(client.email, q);
      score += scoreField(client.phone, q);
      score += scoreField(client.address, q);
      score += scoreField(client.status, q);
      score += scoreField(client.type, q);
      score += scoreField(client.description, q);

      if (score > 0) {
        results.push({
          id: client.id,
          type: "client",
          title: `${client.firstName} ${client.lastName}`,
          subtitle:
            client.company || client.email || client.phone || client.type,
          href: `/clients/${client.id}`,
          score,
        });
      }
    }

    // Sort by score descending
    return results.sort((a, b) => b.score - a.score);
  }, [query, cases, clients]);
}
