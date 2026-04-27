/**
 * Generic API request function with optional authentication
 * @param path - The API endpoint path (e.g., '/voice/session')
 * @param options - Fetch options (method, headers, body, etc.)
 * @param config - Configuration options (requiresAuth, etc.)
 * @returns Promise with typed response
 */
export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  config: { requiresAuth?: boolean } = {}
): Promise<T> {
  // Map logical paths to actual API routes
  const routeMap: Record<string, string> = {
    '/voice/session': '/api/gemini-live-token',
  };

  const actualPath = routeMap[path] || path;

  const response = await fetch(actualPath, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
