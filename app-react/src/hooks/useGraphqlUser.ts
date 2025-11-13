import { useQuery, ApolloError } from "@apollo/client";
import type { OperationVariables } from "@apollo/client";
import { GET_RANDOM_USERS } from "../graphql/queries/getRandomUsers";
import type { RandomUser, RandomUserResponse } from "../api/users";

export interface UseGraphQLUserByIdResult {
  user: RandomUser | undefined;
  data: RandomUserResponse | undefined;
  isPending: boolean;
  isError: boolean;
  error: ApolloError | undefined;
  refetch: (variables?: Partial<OperationVariables>) => Promise<any>;
}

export function useGraphQLUsers(vars?: {
  results?: number;
  inc?: string;
  seed?: string;
  page?: number;
  nat?: string;
}) {
  const { data, loading, error, refetch } = useQuery<{ randomUsers: RandomUserResponse }>(
    GET_RANDOM_USERS,
    {
      variables: {
        results: vars?.results ?? 1000,
        inc: vars?.inc ?? "gender,name,email,cell,login,dob,picture,location",
        seed: vars?.seed ?? "foobar",
        page: vars?.page ?? 1,
        nat: vars?.nat ?? undefined,
      },
      fetchPolicy: "network-only",
    }
  );

  return { data: data?.randomUsers, loading, error, refetch };
}

export function useGraphQLUserById(
  id?: string,
  options?: { results?: number; inc?: string; seed?: string; page?: number }
): UseGraphQLUserByIdResult {
  const { data, loading, error, refetch } = useGraphQLUsers({
    results: options?.results ?? 1000,
    inc: options?.inc ?? "gender,name,email,cell,login,dob,picture,location",
    seed: options?.seed ?? "foobar",
    page: options?.page ?? 1,
  });

  const user = data?.results?.filter((u) => u.login?.uuid === id);
  const userCurrent = user?.[0]

  return {
    user: userCurrent,
    data,
    isPending: Boolean(loading),
    isError: Boolean(error),
    error,
    refetch,
  };
}
