import React, { useState } from "react";
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
  const [user, setUser] = useState(currentUser);
  const [validateText, setValidateText] = useState(null);

  const { name, rocket, twitter, id } = user;

  const [addUser] = useMutation(ADD_USER_MUTATION);
  const [updateUser] = useMutation(EDIT_USERS);

  const [date, setDate] = useState(new Date());

  const validationForm = (userField) => {
    const { name = "", rocket = "", twitter = "" } = userField;

    let errorMessage;

    if (name.length < 3) {
      errorMessage = "Enter the correct name";
    } else if (!rocket?.length) {
      errorMessage = "Rocket field isn't to be empty";
    } else if (!twitter?.length) {
      errorMessage = "Twitter field isn't to be empty";
    } else {
      errorMessage = "";
    }

    if (errorMessage) {
      setValidateText(errorMessage);
    } else {
      setValidateText((errorMessage = ""));
      return true;
    }
  };

  const changeHandler = (event) => {
    event.preventDefault();
    const variables = {
      name: name,
      rocket: rocket,
      twitter: twitter,
      timestamp: date,
    };

    const validate = validationForm(variables);
    try {
      if (validate) {
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
      }
    } catch (err) {
      console.log(`Ooops!! Something went wrong ${err}`);
    }
  };

  const handlerChangeInput = (key, value) => {
    setUser((oldState) => ({
      ...oldState,
      [key]: value,
    }));
  };

  return (
    <div className="form">
      <form
        onSubmit={(e) => {
          changeHandler(e);
        }}
      >
        <div className="input__wrapper">
          <input
            className="form__input"
            type="text"
            placeholder="Name"
            onChange={(e) => handlerChangeInput("name", e.target.value)}
            value={name || ""}
          />
          <input
            className="form__input"
            type="text"
            placeholder="Rocket"
            onChange={(e) => handlerChangeInput("rocket", e.target.value)}
            value={rocket || ""}
          />
          <DatePicker
            className="form__input date"
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
            onChange={(e) => handlerChangeInput("twitter", e.target.value)}
            value={twitter || ""}
          />
          <p>
            {validateText && (
              <span style={{ color: "red" }}>{validateText}</span>
            )}
          </p>
        </div>
        <button className="form__button" type="submit">
          {FORM_TYPE[formType]}
        </button>
      </form>
    </div>
  );
};
