import { gql } from "@apollo/client";
import { USER_FIELDS } from "./Fragment";

export const GET_ALL_USERS = gql`
  ${USER_FIELDS}
  query GetAllUsers {
    users {
      ...UserFields
    }
  }
`;
