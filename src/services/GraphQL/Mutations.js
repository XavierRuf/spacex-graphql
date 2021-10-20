import { gql } from "@apollo/client";
import { USER_FIELDS } from "./Fragment";
export const ADD_USER_MUTATION = gql`
  mutation AddUser($insertUsersObjects: [users_insert_input!]!) {
    insert_users(objects: $insertUsersObjects) {
      returning {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`;

export const EDIT_USERS = gql`
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
  ${USER_FIELDS}
`;

export const DELETE_USERS = gql`
  mutation DeleteUser($deleteUser: users_bool_exp!) {
    delete_users(where: $deleteUser) {
      returning {
        ...UserFields
        id
      }
    }
  }
  ${USER_FIELDS}
`;
