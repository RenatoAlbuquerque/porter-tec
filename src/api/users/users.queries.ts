import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { RandomUserResponse } from "./users.types";
import { fetchRandomUsers, RandomUserParams } from "./users.api";

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
