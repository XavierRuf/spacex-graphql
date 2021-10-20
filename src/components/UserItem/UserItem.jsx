import React from "react";
import { useMutation } from "@apollo/client";
import "./UserItem.css";
import { DELETE_USERS } from "../../services/GraphQL/Mutations";
import { GET_ALL_USERS } from "../../services/GraphQL/Queries";
import { FORM_TYPE } from "../../constants";

export const UserItem = ({ user, clickHandler, changeShowModal }) => {
  const { name, id, rocket } = user;

  const [deleteUser] = useMutation(DELETE_USERS, {
    refetchQueries: [GET_ALL_USERS, "GetAllUsers"],
  });

  const handlerDeleteUser = () => {
    if (FORM_TYPE.Delete) {
      deleteUser({
        variables: {
          deleteUser: {
            id: {
              _eq: id,
            },
          },
        },
      });
    }
  };

  return (
    <div onClick={() => clickHandler(user)} tabIndex={0} className="users">
      <div className="user__info" onClick={changeShowModal}>
        {name && <p className="user__name">{name}</p>}
        <p className="user__rocket">
          {user.rocket && <span>Rocket: {rocket}</span>}
        </p>
      </div>
      <button className="users__btn--delete" onClick={handlerDeleteUser}>
        {FORM_TYPE.Delete}
      </button>
    </div>
  );
};
