import { gql } from "@apollo/client";
import { USER_FIELDS } from "./Fragment";
export const ADD_USER_MUTATION = gql`
  ${USER_FIELDS}
  mutation AddUser($insertUsersObjects: [users_insert_input!]!) {
    insert_users(objects: $insertUsersObjects) {
      returning {
        ...UserFields
      }
    }
  }
`;

export const EDIT_USERS = gql`
  ${USER_FIELDS}
  mutation UpdateUser(
    $updateValues: users_set_input
    $updateUsers: users_bool_exp!
  ) {
    update_users(_set: $updateValues, where: $updateUsers) {
      returning {
        ...UserFields
        id
      }
    }
  }
`;
