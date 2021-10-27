import React from "react";
import { withRouter } from "react-router-dom";
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
  setSelectedUser,
  changeShowModal,
  show,
  setShow,
  setFormType,
  itemID,
  history,
}) {
  const { loading, data, error } = useQuery(GET_ALL_USERS);
  const clearInputUserField = {
    name: "",
    rocket: "",
    twitter: "",
  };
  if (error) {
    return console.log(`Something went wrong by ${error}`);
  }

  
data && data.users.forEach((item) => {
  if(item.id !== itemID) {
    <h2>ERR</h2>
  }
})

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="users__wrapp">
          <div className="users__item">
            {data.users?.map((value) => {
              return (
                  <UserItem
                    itemID={itemID}
                    history={history}
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
                  setSelectedUser(clearInputUserField);
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

export default withRouter(GetUsers);
