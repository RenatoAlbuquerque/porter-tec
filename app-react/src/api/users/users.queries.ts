import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchRandomUsers, type RandomUserParams } from "./users.api";
import type { RandomUserResponse } from "./users.types";

export const useRandomUsers = (
  params: RandomUserParams,
  options?: UseQueryOptions<RandomUserResponse, Error>,
) => {
  return useQuery<RandomUserResponse, Error>({
    queryKey: ["randomUsers", params],
    queryFn: () => fetchRandomUsers(params),
    ...options,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
