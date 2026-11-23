const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Frontend API service utility.
 * Sends typed requests to the backend with credentials and standard JSON headers.
 */
export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const cleanBase = API_BASE_URL.replace(/\/$/, "");
  const cleanEndpoint = endpoint.replace(/^\//, "");
  const url = `${cleanBase}/${cleanEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody?.error?.message || errorBody?.message || `Request failed with status ${response.status}`,
    );
  }

  return response.json();
}
