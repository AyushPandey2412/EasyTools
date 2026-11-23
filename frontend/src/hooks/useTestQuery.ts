import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/utils/api";

export interface TestResponse {
  success: boolean;
  feature: string;
  message: string;
  timestamp: string;
}

/**
 * Custom TanStack Query hook to fetch data from the backend /test route.
 */
export function useTestQuery() {
  return useQuery({
    queryKey: ["test"],
    queryFn: () => fetchApi<TestResponse>("/test"),
  });
}
