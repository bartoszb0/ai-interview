const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok && response.status !== 304) {
    const error = await response.json();
    throw new Error(error.message);
  }

  if (response.status === 204 || response.status === 304) return;

  return response.json();
}
