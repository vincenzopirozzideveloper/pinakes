export interface ApiResponse<T> {
  data: T;
  meta?: ApiMeta;
  message?: string;
}

export interface ApiMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: ApiMeta;
}
