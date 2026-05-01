import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMyNotes,
  fetchMyNote,
  createNote,
  fetchPublicGarden,
  fetchPublicContent,
  type ListParams,
  type CreateNotePayload,
} from '../api/content.api';

const keys = {
  myNotes: (ws: string, params?: ListParams) => ['notes', ws, 'list', params ?? {}] as const,
  myNote: (ws: string, slug: string) => ['notes', ws, 'detail', slug] as const,
  publicGarden: (ws: string) => ['garden', ws] as const,
  publicContent: (ws: string, slug: string) => ['garden', ws, slug] as const,
  allNotes: (ws: string) => ['notes', ws] as const,
};

export function useMyNotes(workspace: string, params?: ListParams) {
  return useQuery({
    queryKey: keys.myNotes(workspace, params),
    queryFn: () => fetchMyNotes(workspace, params),
    enabled: !!workspace,
    staleTime: 60_000,
  });
}

export function useMyNote(workspace: string, slug: string) {
  return useQuery({
    queryKey: keys.myNote(workspace, slug),
    queryFn: () => fetchMyNote(workspace, slug),
    enabled: !!workspace && !!slug,
    staleTime: 60_000,
  });
}

export function useCreateNote(workspace: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(workspace, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.allNotes(workspace) });
    },
  });
}

export function usePublicGarden(workspace: string) {
  return useQuery({
    queryKey: keys.publicGarden(workspace),
    queryFn: () => fetchPublicGarden(workspace),
    enabled: !!workspace,
    staleTime: 5 * 60_000,
  });
}

export function usePublicContent(workspace: string, slug: string) {
  return useQuery({
    queryKey: keys.publicContent(workspace, slug),
    queryFn: () => fetchPublicContent(workspace, slug),
    enabled: !!workspace && !!slug,
    staleTime: 5 * 60_000,
  });
}
