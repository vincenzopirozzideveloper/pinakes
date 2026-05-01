export type WorkspaceVisibility = 'private' | 'public' | 'unlisted';

export interface Workspace {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  visibility: WorkspaceVisibility;
  owner_id: number;
  notes_count: number;
  created_at: string;
  updated_at: string;
}
