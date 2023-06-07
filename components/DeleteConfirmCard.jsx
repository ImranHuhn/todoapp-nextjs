// import React from "react";

// const style = {
//   deleteCardBg: `flex flex-col justify-center mx-auto bg-slightWhite px-4 py-4 rounded-md text-center  max-w-sm`,
//   titleText: `text-xl`,
//   buttonDiv: ``,
//   buttonCancel: `bg-blue-100 rounded-lg m-3 py-2 px-4`,
//   buttonDelete: `bg-blue-100 rounded-lg m-3 py-2 px-4 border-red border-2  `,
// };

// const DeleteConfirmCard = ({onClose, onDelete}) => {

//   const handleCancel = () => {
//     onClose();
//   };
//   const handleDeleteConfirm = (task) => {
//     onDelete(task);
//   };

//     return (
//       <div className={style.deleteCardBg}>
//         <span className={style.titleText}>
//           Are you sure you want to delete this task ?
//         </span>

//         <div className={style.buttonDiv}>
//           <button className={style.buttonCancel} onClick={handleCancel}>
//             Cancel
//           </button>
//           <button
//             className={style.buttonDelete}
//             onClick={handleDeleteConfirm}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     );
// }

// export default DeleteConfirmCard;
