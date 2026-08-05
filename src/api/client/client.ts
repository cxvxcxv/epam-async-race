import {
  buildHeaders,
  buildUrl,
  ensureSuccess,
  parseJson,
  serializeBody,
} from './helpers';
import type { HttpResponse, RequestOptions } from './types';

export async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<HttpResponse<T>> {
  const { query, body, headers, ...fetchOptions } = options;

  const response = await fetch(buildUrl(endpoint, query), {
    ...fetchOptions,
    headers: buildHeaders(body, headers),
    body: serializeBody(body),
  });

  await ensureSuccess(response);

  return {
    data: await parseJson<T>(response),
    headers: response.headers,
    status: response.status,
  };
}

export function get<T>(
  endpoint: string,
  options?: Omit<RequestOptions, 'method'>,
): Promise<HttpResponse<T>> {
  return request<T>(endpoint, {
    ...options,
    method: 'GET',
  });
}

export function post<T>(
  endpoint: string,
  body?: RequestOptions['body'],
  options?: Omit<RequestOptions, 'body' | 'method'>,
): Promise<HttpResponse<T>> {
  return request<T>(endpoint, {
    ...options,
    method: 'POST',
    body,
  });
}

export function put<T>(
  endpoint: string,
  body?: RequestOptions['body'],
  options?: Omit<RequestOptions, 'body' | 'method'>,
): Promise<HttpResponse<T>> {
  return request<T>(endpoint, {
    ...options,
    method: 'PUT',
    body,
  });
}

export function patch<T>(
  endpoint: string,
  body?: RequestOptions['body'],
  options?: Omit<RequestOptions, 'body' | 'method'>,
): Promise<HttpResponse<T>> {
  return request<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body,
  });
}

export function remove<T>(
  endpoint: string,
  options?: Omit<RequestOptions, 'method'>,
): Promise<HttpResponse<T>> {
  return request<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}
