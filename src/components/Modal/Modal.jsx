import React, { useRef } from "react";
import { UserForm } from "../UserForm/UserForm";
import "./Modal.css";
export const Modal = ({
  currentUser,
  formType,
  changeShowModal,
  show,
  setShow,
}) => {
  const modalRef = useRef(null);

  //   const handleOutsideClick = (e) => {
  //     if (!e.path.includes(modalRef.current) && show) {
  //       setShow((prev) => !prev);
  //       console.log("hello");
  //     }
  //   };

  //   useEffect(() => {
  //     document.body.addEventListener("click", handleOutsideClick);
  //   }, []);

  return (
    <>
      {show && (
        <div className="modal">
          <div ref={modalRef} className="modal__content">
            <div className="modal__header">
              <h4 className="modal__title">Change Info by User</h4>
            </div>
            <div className="modal__body">
              <UserForm currentUser={currentUser} formType={formType} />
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
