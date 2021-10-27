// import React from "react";
// import { useMutation } from "@apollo/client";
// import "./UserItem.css";
// import { DELETE_USERS } from "../../services/GraphQL/Mutations";
// import { GET_ALL_USERS } from "../../services/GraphQL/Queries";
// import { FORM_TYPE } from "../../constants";

// export const UserItem = ({
//   user,
//   clickHandler,
//   changeShowModal,
//   history,
//   itemID,
// }) => {
//   const { name, id, rocket } = user;

//   const [deleteUser] = useMutation(DELETE_USERS, {
//     update: (cache, data) => {
//       const legacyCacheUsers = cache.readQuery({ query: GET_ALL_USERS });
//       const userData = data.data.delete_users.returning[0]?.id;
//       const deletedID = userData;

//       const newUsers = legacyCacheUsers.users.filter(
//         (prev) => prev.id !== deletedID
//       );

//       cache.writeQuery({
//         query: GET_ALL_USERS,
//         data: {
//           users: [...newUsers],
//         },
//       });
//     },
//   });

//   const handlerDeleteUser = () => {
//     if (FORM_TYPE.Delete) {
//       deleteUser({
//         variables: {
//           deleteUser: {
//             id: {
//               _eq: id,
//             },
//           },
//         },
//       });
//     }
//   };

//   return (
//     <div
//       onClick={() => {
//         history.push(`/${id}`);
//         clickHandler(user);
//       }}
//       tabIndex={0}
//       className="users"
//     >
//       <div className="users__info" onClick={changeShowModal}>
//         {name && <p className="users__name">{name}</p>}
//         <p className="users__rocket">
//           {rocket && <span>Rocket: {rocket}</span>}
//         </p>
//       </div>
//       <button className="users__btn--delete" onClick={handlerDeleteUser}>
//         {FORM_TYPE.Delete}
//       </button>
//     </div>
//   );
// };
