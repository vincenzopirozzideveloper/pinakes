import { api } from '@/shared/api/client';
import axios from 'axios';

const publicApi = axios.create({
  baseURL: '/api/v1/public',
  headers: { Accept: 'application/json' },
});

export type ContentType = 'note' | 'post' | 'bookmark' | 'snippet' | 'sketch';
export type Maturity = 'seedling' | 'budding' | 'evergreen' | 'archived';
export type Visibility = 'public' | 'unlisted' | 'private';

export type MaturityStage = Maturity;

export interface TopicDTO {
  id: string;
  slug: string;
  name: string;
  content_count?: number;
}

export interface ContentDTO {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  body_rendered?: string | null;
  body_html?: string | null;
  cover_image_url: string | null;
  maturity: Maturity;
  visibility: Visibility;
  read_time_minutes: number | null;
  word_count: number | null;
  topics: TopicDTO[];
  tags: string[];
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GardenStats {
  notes: number;
  posts: number;
  bookmarks: number;
  evergreen: number;
}

export interface GardenData {
  contents: ContentDTO[];
  stats: GardenStats;
}

export interface ListParams {
  type?: ContentType;
  maturity?: Maturity;
  page?: number;
  per_page?: number;
  q?: string;
  sort?: 'updated_at' | 'created_at' | 'title';
  order?: 'asc' | 'desc';
}

export interface CreateNotePayload {
  title: string;
  body: string;
  maturity?: Maturity;
}

export async function fetchMyNotes(workspace: string, params?: ListParams): Promise<ContentDTO[]> {
  const { data } = await api.get(`/w/${workspace}/notes`, { params });
  return data.data as ContentDTO[];
}

export async function fetchMyNote(workspace: string, slug: string): Promise<ContentDTO> {
  const { data } = await api.get(`/w/${workspace}/notes/${slug}`);
  return data.data as ContentDTO;
}

export async function createNote(workspace: string, payload: CreateNotePayload): Promise<ContentDTO> {
  const { data } = await api.post(`/w/${workspace}/notes`, payload);
  return data.data as ContentDTO;
}

export async function fetchPublicGarden(workspace: string): Promise<GardenData> {
  try {
    const { data } = await publicApi.get(`/g/${workspace}`);
    return data.data as GardenData;
  } catch {
    return {
      contents: [],
      stats: { notes: 0, posts: 0, bookmarks: 0, evergreen: 0 },
    };
  }
}

export async function fetchPublicContent(workspace: string, slug: string): Promise<ContentDTO> {
  const { data } = await publicApi.get(`/g/${workspace}/${slug}`);
  return data.data as ContentDTO;
}
