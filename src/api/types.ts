export interface ApiFetchOptions extends Omit<RequestInit, 'body'> {
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

export interface ApiResponse<T> {
  data: T;
  totalCount: number | null;
  status: number;
  ok: boolean;
}
