export interface Note {
  id: string;
  content: string;
  author: string;
  authorId?: string;
  createdAt: string;
  updatedAt?: string;
  isPrivate?: boolean;
}
