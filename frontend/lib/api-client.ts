const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/+$/, "");

type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  errorMessage?: string;
};

export async function apiClient<TResponse>(
  endpoint: string,
  { body, errorMessage = "Unable to complete request", headers, ...options }: ApiClientOptions = {},
): Promise<TResponse> {
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_URL}${normalizedEndpoint}`, {
    ...options,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json() as Promise<TResponse>;
}
