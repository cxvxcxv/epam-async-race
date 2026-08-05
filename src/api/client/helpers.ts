import { API_BASE_URL } from '@/shared/constants';

import { ApiError } from './errors';
import type { QueryParams } from './types';

export function buildUrl(endpoint: string, query?: QueryParams): string {
  const url = new URL(endpoint, API_BASE_URL);

  if (!query) {
    return url.toString();
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

export function isJsonResponse(response: Response): boolean {
  return (
    response.headers.get('Content-Type')?.includes('application/json') ?? false
  );
}

export function isJsonBody(body: unknown): body is Record<string, unknown> {
  return (
    body !== null &&
    typeof body === 'object' &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof URLSearchParams)
  );
}

export function buildHeaders(
  body: unknown,
  headers?: HeadersInit,
): HeadersInit {
  return {
    ...(isJsonBody(body) ? { 'Content-Type': 'application/json' } : {}),
    ...headers,
  };
}

export function serializeBody(
  body?: BodyInit | Record<string, unknown>,
): BodyInit | undefined {
  if (!body) {
    return undefined;
  }

  return isJsonBody(body) ? JSON.stringify(body) : body;
}

export async function ensureSuccess(response: Response): Promise<void> {
  if (response.ok) {
    return;
  }

  let message: string | undefined;

  if (isJsonResponse(response)) {
    try {
      const json = (await response.json()) as {
        message?: string;
      };

      message = json.message;
    } catch {
      // fallback if json parse fails
    }
  } else {
    try {
      message = await response.text();
    } catch {
      // fallback if text parse fails
    }
  }

  throw new ApiError(response.status, response.statusText, message);
}

export async function parseJson<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  if (!isJsonResponse(response)) {
    throw new Error('Expected JSON response.');
  }

  return (await response.json()) as T;
}
