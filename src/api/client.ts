import type { ApiError } from '../types/api-error';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Wraps fetch with credentials: 'include' (sends the jwt httpOnly cookie
 * automatically) and consistent error handling. Returns parsed JSON for
 * responses with a body, or undefined for empty-body responses (e.g. 200 OK
 * from join league, logout, delete post, etc.).
 */
export async function apiFetch<T = void>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: 'include',
  });

  if (!res.ok) {
    const errText = await res.text();
    const err: ApiError = errText
      ? (JSON.parse(errText) as ApiError)
      : { status: res.status, error: res.statusText, message: 'An unexpected error occurred.' };
    throw err;
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
