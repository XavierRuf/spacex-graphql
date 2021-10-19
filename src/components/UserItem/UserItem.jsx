import React from "react";
import "./UserItem.css";
import { FORM_TYPE } from "../../constants";

export const UserItem = ({ user, clickHandler }) => {
  const { name, rocket } = user;
  return (
    <div onClick={() => clickHandler(user)} tabIndex={0} className="users">
      <div className="user__info">
        {name && <p className="user__name">{name}</p>}
        <p className="user__rocket">
          {user.rocket && <span>Rocket: {rocket}</span>}
        </p>
      </div>
      <button className="users__btn--delete">{FORM_TYPE.Delete}</button>
    </div>
  );
};
