import React from "react";
import { UserForm } from "../UserForm/UserForm";
import "./Modal.css";
export const Modal = ({
  currentUser,
  formType,
  changeShowModal,
  show,
}) => {
  return (
    <>
      {show && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__header">
              <h4 className="modal__title">Change Info by User</h4>
            </div>
            <div className="modal__body">
              <UserForm
                currentUser={currentUser}
                formType={formType}
              />
            </div>
            <div className="modal__footer footer">
              <span onClick={changeShowModal} className="footer_closeBtn">
                close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
