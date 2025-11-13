// src/graphql/queries/getRandomUsers.ts
import { gql } from "@apollo/client";

export const GET_RANDOM_USERS = gql`
  query GetRandomUsers($results: Int, $inc: String, $seed: String, $page: Int, $nat: String) {
    randomUsers(results: $results, inc: $inc, seed: $seed, page: $page, nat: $nat)
      @rest(type: "RandomUserResponse", path: "?results={args.results}&inc={args.inc}&seed={args.seed}&page={args.page}") {
      results {
        gender
        name {
          title
          first
          last
        }
        location {
          city
          country
          state
          street
        }
        email
        login {
          uuid
          username
        }
        dob {
          date
          age
        }
        phone
        cell
        id {
          name
          value
        }
        picture {
          medium
        }
      }
      info {
        seed
        results
        page
        version
      }
    }
  }
`;
