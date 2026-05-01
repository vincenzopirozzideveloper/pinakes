export const queryKeys = {
  me: () => ['me'] as const,

  workspaces: () => ['workspaces'] as const,
  workspace: (slug: string) => ['workspaces', slug] as const,

  notes: (workspace: string) => ['notes', workspace] as const,
  note: (workspace: string, slug: string) => ['notes', workspace, slug] as const,

  search: (workspace: string, q: string) => ['search', workspace, q] as const,

  publicGarden: (workspace: string) => ['garden', workspace] as const,
  publicContent: (workspace: string, slug: string) => ['garden', workspace, slug] as const,
} as const;
