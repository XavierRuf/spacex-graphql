import React from "react";
//Style
import "./GetUsers.css";
//Apollo
import { useQuery } from "@apollo/client";
import { UserItem } from "../UserItem/UserItem";
import { GET_ALL_USERS } from "../../services/GraphQL/Queries";

function GetUsers({ clickHandler }) {
  const { loading, data, error } = useQuery(GET_ALL_USERS);

  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return console.log(`Something went wrong by ${error}`);
  }

  return (
    <div>
      {data.users.map((value) => {
        return (
          <UserItem
            user={value}
            key={value.id}
            clickHandler={(value) => clickHandler(value)}
          />
        );
      })}
    </div>
  );
}

export default GetUsers;
