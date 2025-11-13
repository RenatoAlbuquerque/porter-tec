import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: "https://randomuser.me/api",
});

export const apolloClient = new ApolloClient({
  link: restLink as any,
  cache: new InMemoryCache(),
});
