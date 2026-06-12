export type SearchResultType = "case" | "client";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  href: string;
  score: number;
}
