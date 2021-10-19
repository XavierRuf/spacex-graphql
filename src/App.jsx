import React, { useState } from "react";
import "./App.css";
import GetUsers from "./components/GetUsers";
import { UserForm } from "./components/UserForm/UserForm";
import { ApolloClient, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { cache } from "./cache";
import { FORM_TYPE } from "./constants";

const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://api.spacex.land/graphql/" }),
]);

const client = new ApolloClient({
  link: link,
  cache,
});

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState(FORM_TYPE.Add);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    rocket: "",
    timestamp: null,
    twitter: "",
  });

  const clickHandler = (user) => {
    setIsFormVisible((prev) => !prev);
    setSelectedUser(user);
    setFormType(FORM_TYPE.Edit);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="wrapper">
          <div className="container">
            <GetUsers clickHandler={clickHandler} />
            {isFormVisible && (
              <UserForm currentUser={selectedUser} formType={formType} />
            )}
            {!isFormVisible && (
              <button
                className="button__add"
                onClick={() => {
                  setIsFormVisible(!isFormVisible);
                  setFormType(FORM_TYPE.Add);
                }}
              >
                {FORM_TYPE.Add}
              </button>
            )}
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
