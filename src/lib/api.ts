"use client";

// TEKA NEXUS — typed client for the REST API.
// Every call returns parsed JSON; failures throw ApiError with a readable message.

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Session token mirror for contexts where cookies are dropped (e.g. the
// cross-origin preview iframe). Middleware re-attaches this as a cookie.
const TOKEN_KEY = "teka_session_token";

export function getSessionToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setSessionToken(token: string | null): void {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
}

// ── Resilience (fixes the "بعد یکم گشتن، نت ضعیفه" symptom) ────────────────
// Transient server-side hiccups (serverless cold starts, pooler blips, 502s)
// must not surface as "اتصال به سرور برقرار نشد" toasts. We:
//   1. fail hung requests fast (abort after 20 s — no eternal spinners),
//   2. auto-retry idempotent GETs (network errors, 429, 5xx) and mutations
//      (only on gateway errors 502/503/504 where the server never processed
//      the request) with a short backoff.
const REQUEST_TIMEOUT_MS = 20_000;

function isIdempotent(method: string) {
  return method === "GET" || method === "HEAD";
}

function isGatewayError(status: number) {
  return status === 502 || status === 503 || status === 504;
}

async function fetchOnce(path: string, init: RequestInit): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(path, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getSessionToken();
  const method = (init?.method ?? "GET").toUpperCase();
  const baseInit: RequestInit = {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { "x-teka-session": token } : {}),
      ...init?.headers,
    },
    credentials: "same-origin",
  };

  const maxAttempts = isIdempotent(method) ? 3 : 2;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (attempt > 1) await new Promise((r) => setTimeout(r, 400 * attempt));
    let res: Response;
    try {
      res = await fetchOnce(path, baseInit);
    } catch (e) {
      // Network failure / timeout: only idempotent requests are safe to retry.
      lastError = e;
      if (isIdempotent(method) && attempt < maxAttempts) continue;
      throw new ApiError("Network connection failed — check your connection and try again.", 0);
    }
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      /* empty body */
    }
    if (!res.ok) {
      // Retry on transient gateway errors (both GETs and mutations — the
      // request never reached app logic, so no double-write risk).
      if ((isIdempotent(method) || isGatewayError(res.status)) && attempt < maxAttempts && (res.status >= 500 || res.status === 429)) {
        lastError = new ApiError(
          data && typeof data === "object" && "error" in data
            ? String((data as { error: unknown }).error)
            : `Request failed (${res.status})`,
          res.status
        );
        continue;
      }
      const msg =
        data && typeof data === "object" && "error" in data
          ? String((data as { error: unknown }).error)
          : `Request failed (${res.status})`;
      throw new ApiError(msg, res.status);
    }
    return data as T;
  }
  // Unreachable in practice; satisfies TypeScript.
  throw lastError instanceof Error
    ? new ApiError(lastError.message, 0)
    : new ApiError("Network connection failed — check your connection and try again.", 0);
}

export const get = <T>(path: string) => request<T>(path);
export const post = <T>(path: string, body?: unknown) =>
  request<T>(path, { method: "POST", body: body === undefined ? "{}" : JSON.stringify(body) });
export const patch = <T>(path: string, body?: unknown) =>
  request<T>(path, { method: "PATCH", body: body === undefined ? "{}" : JSON.stringify(body) });
export const del = <T>(path: string, body?: unknown) =>
  request<T>(path, { method: "DELETE", body: body === undefined ? undefined : JSON.stringify(body) });

export function qs(params: Record<string, string | number | undefined | null>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}
