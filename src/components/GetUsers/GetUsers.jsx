import React from "react";
import { withRouter } from "react-router-dom";
//Style
import "./GetUsers.css";
import { useMutation } from "@apollo/client";
import { FORM_TYPE } from "../../constants";
import { GET_ALL_USERS } from "../../services/GraphQL/Queries";
import { DELETE_USERS } from "../../services/GraphQL/Mutations";

function GetUsers({
  data,
  clickHandler,
  changeShowModal,
  show,
  setShow,
  setFormType,
  setSelectedUser,
  history,
}) {
  const clearInputUserField = {
    name: "",
    rocket: "",
    twitter: "",
  };

  const [deleteUser] = useMutation(DELETE_USERS, {
    update: (cache, data) => {
      const legacyCacheUsers = cache.readQuery({ query: GET_ALL_USERS });
      const userData = data.data.delete_users.returning[0]?.id;
      const deletedID = userData;

      const newUsers = legacyCacheUsers.users.filter(
        (prev) => prev.id !== deletedID
      );

      cache.writeQuery({
        query: GET_ALL_USERS,
        data: {
          users: [...newUsers],
        },
      });
    },
  });

  return (
    <>
      <div className="users__wrapp">
        <div className="users__item">
          {data.users?.map((value) => {
            const { name, rocket, id } = value;
            return (
              <div key={id}>
                <div
                  onClick={() => {
                    history.push(`/${id}`);
                    clickHandler(value);
                  }}
                  tabIndex={0}
                  className="users"
                >
                  <div className="users__info" onClick={changeShowModal}>
                    {name && <p className="users__name">{name}</p>}
                    <p className="users__rocket">
                      {rocket && <span>Rocket: {rocket}</span>}
                    </p>
                  </div>
                  <button
                    className="users__btn--delete"
                    onClick={() => {
                      deleteUser({
                        variables: {
                          deleteUser: {
                            id: {
                              _eq: id,
                            },
                          },
                        },
                      });
                    }}
                  >
                    {FORM_TYPE.Delete}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {!show && (
          <div className="users__btn">
            <button
              className="button__add"
              onClick={() => {
                setShow(!show);
                setFormType(FORM_TYPE.Add);
                setSelectedUser(clearInputUserField);
              }}
            >
              {FORM_TYPE.Add}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default withRouter(GetUsers);
