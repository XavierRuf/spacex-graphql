import React, { useState, useRef } from "react";
import "./UserForm.css";
import { useMutation } from "@apollo/client";
import {
  ADD_USER_MUTATION,
  EDIT_USERS,
} from "../../services/GraphQL/Mutations.js";
import { FORM_TYPE } from "../../constants.js";
import { GET_ALL_USERS } from "../../services/GraphQL/Queries.js";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const UserForm = ({ currentUser, formType }) => {
  const { name, rocket, twitter, id } = currentUser;

  const [addUser] = useMutation(ADD_USER_MUTATION);
  const [updateUser] = useMutation(EDIT_USERS);

  const [date, setDate] = useState(new Date());
  const nameRef = useRef(null);
  const rocketRef = useRef(null);
  const twitterRef = useRef(null);

  const changeHandler = (event) => {
    event.preventDefault();
    const variables = {
      name: nameRef.current.value,
      rocket: rocketRef.current.value,
      twitter: twitterRef.current.value,
      timestamp: date,
    };
    //later change this code...
    nameRef.current.value = "";
    rocketRef.current.value = "";
    twitterRef.current.value = "";

    return formType === FORM_TYPE.Add
      ? addUser({
          variables: {
            insertUsersObjects: [
              {
                ...{ ...variables, id },
              },
            ],
          },
          update: (cache, data) => {
            if (data) {
              const cachedData = cache.readQuery({ query: GET_ALL_USERS });
              const updatedCacheData = {
                users: [
                  ...cachedData.users,
                  data.data.insert_users.returning[0],
                ],
              };
              cache.writeQuery({
                query: GET_ALL_USERS,
                data: updatedCacheData,
              });
            }
          },
          // optimisticResponse: {
          //   insertUsersObjects: {
          //     ...{ ...variables, id },
          //   },
          // },
        })
      : updateUser({
          variables: {
            updateValues: {
              ...{ ...variables, id },
            },
            updateUsers: {
              id: {
                _eq: id,
              },
            },
          },
        });
  };

  return (
    <div className="form">
      <form
        onSubmit={(e) => {
          changeHandler(e);
        }}
      >
        <input
          className="form__input"
          type="text"
          placeholder="Name"
          defaultValue={name}
          ref={nameRef}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Rocket"
          defaultValue={rocket}
          ref={rocketRef}
        />
        <DatePicker
          className="form__input"
          selected={date}
          showTimeSelect
          dateFormat="Pp"
          onChange={(date) => {
            setDate(date);
          }}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Twitter"
          defaultValue={twitter}
          ref={twitterRef}
        />
        <button className="form__button" type="submit">
          {FORM_TYPE[formType]}
        </button>
      </form>
    </div>
  );
};
