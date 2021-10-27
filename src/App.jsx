import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
//Queries
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "./services/GraphQL/Queries";
//Constants
import { FORM_TYPE } from "./constants";
//Components
import { Header } from "./components/Header/Header";
import { Loader } from "./components/Loader/Loader";
import GetUsers from "./components/GetUsers";
import { Modal } from "./components/Modal/Modal";

function App() {
  const { loading, data, error } = useQuery(GET_ALL_USERS);

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

  if (loading) return <Loader />;
  if (error) return console.log(`Something went wrong by ${error}`);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="wrapper">
          <Route
            path="/:id?"
            render={() => {
              return (
                <GetUsers
                  data={data}
                  clickHandler={clickHandler}
                  changeShowModal={changeShowModal}
                  show={show}
                  setShow={setShow}
                  setFormType={setFormType}
                  setSelectedUser={setSelectedUser}
                />
              );
            }}
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
    </Router>
  );
}

export default App;
