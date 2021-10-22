import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import GetUsers from "./components/GetUsers";
import { Modal } from "./components/Modal/Modal";
import { ApolloClient, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { cache } from "./cache";
import { FORM_TYPE } from "./constants";

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
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
  const [show, setShow] = useState(false);
  const [formType, setFormType] = useState(FORM_TYPE.Add);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    rocket: "",
    timestamp: null,
    twitter: "",
  });

  const changeShowModal = () => {
    setShow(!show);
  };
  const clickHandler = (user) => {
    setSelectedUser(user);
    setFormType(FORM_TYPE.Edit);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <div className="wrapper">
          <GetUsers
            show={show}
            setSelectedUser={setSelectedUser}
            setShow={setShow}
            setFormType={setFormType}
            clickHandler={clickHandler}
            changeShowModal={changeShowModal}
          />
          {show && (
            <Modal
              currentUser={selectedUser}
              formType={formType}
              changeShowModal={changeShowModal}
              show={show}
              setShow={setShow}
            />
          )}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
