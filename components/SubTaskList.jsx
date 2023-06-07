// import React, { useState } from "react";

// const SubTaskList = ({ onAddSubtask }) => {

//   const [ subTasks, setSubTasks] = useState("");

//   const handleChangeSubTask = (e) => {
//     setSubTasks( e.target.value);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && subTasks.trim() !== "") {
//       e.preventDefault();
//       onAddSubtask(subTasks);
//       setSubTasks("");
//     }
//   };

//     return (
//       <div>
//         <input
//           className="bg-white rounded-full w-full h-8 pr-2 pl-4 py-1"
//           name="subTasks"
//           value={subTasks}
//           onChange={handleChangeSubTask}
//           onKeyDown={handleKeyDown}
//           placeholder="Enter sub tasks..."
//           type="text"
//         />
//       </div>
//     );
  
// }

// export default SubTaskList;
