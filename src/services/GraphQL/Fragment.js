import { gql } from "@apollo/client";

export const USER_FIELDS = gql`
  fragment UserFields on users {
    id
    name
    rocket
    timestamp
    twitter
  }
`;
