import React from "react";
//Style
import { Loader } from "../Loader/Loader";
import "./GetUsers.css";
//Apollo
import { FORM_TYPE } from "../../constants";
import { useQuery } from "@apollo/client";
import { UserItem } from "../UserItem/UserItem";
import { GET_ALL_USERS } from "../../services/GraphQL/Queries";

function GetUsers({
  clickHandler,
  changeShowModal,
  show,
  setShow,
  setFormType,
}) {
  const { loading, data, error } = useQuery(GET_ALL_USERS);
  if (error) {
    return console.log(`Something went wrong by ${error}`);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="users__wrapp">
          <div className="users__item">
            {data?.users.map((value) => {
              return (
                <UserItem
                  changeShowModal={changeShowModal}
                  user={value}
                  key={value.id}
                  clickHandler={(value) => clickHandler(value)}
                />
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
                }}
              >
                {FORM_TYPE.Add}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default GetUsers;
