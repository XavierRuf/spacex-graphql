import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
import { UserForm } from "./components/UserForm/UserForm";

function App() {
  const { loading, data, error } = useQuery(GET_ALL_USERS);
  const [formType, setFormType] = useState(FORM_TYPE.Add);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    rocket: "",
    timestamp: null,
    twitter: "",
  });

  const clickHandler = (user) => {
    setSelectedUser(user);
    setFormType(FORM_TYPE.Edit);
  };

  if (loading) return <Loader />;
  if (error) return console.log(`Something went wrong by ${error}`);

  return (
    <Router>
      <div className="App">
        <Link to="/">
          <Header />
        </Link>
        <div className="wrapper">
          <Route
            path="/"
            exact
            render={() => {
              return (
                <GetUsers
                  formVisible={formVisible}
                  setFormVisible={setFormVisible}
                  formType={formType}
                  data={data}
                  clickHandler={clickHandler}
                  setFormType={setFormType}
                  setSelectedUser={setSelectedUser}
                />
              );
            }}
          />
          <Route
            path="/:id"
            render={({ match }) => {
              const { id } = match.params;
              return (
                <UserForm
                  itemId={id}
                  formType={formType}
                  currentUser={selectedUser}
                />
              );
            }}
          />
          {formVisible && (
            <Route
              render={() => {
                return (
                  <UserForm formType={formType} currentUser={selectedUser} />
                );
              }}
            />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
