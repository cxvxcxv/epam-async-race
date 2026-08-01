export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>;

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  method?: HttpMethod;
  query?: QueryParams;
  body?: BodyInit | Record<string, unknown>;
}

export interface HttpResponse<T> {
  data: T;
  headers: Headers;
  status: number;
}
