"use client";

import React, { useContext, useState } from "react";
// import { additionIcon, settingsIcon } from "../Svg";
import TaskCard from "../components/TaskCard";
import { TaskContext } from "../context/TaskContext";
import HideStatus from "../components/HideStatus";

const style = {
  subTitleBg: `  flex  flex-col  gap-3 m-2 px-3 py-2 w-[21rem] min-w-[21rem]  `,
  subIconContainer: `flex flex-row gap-2 items-center`,
  subTitleSpacing: `flex flex-row justify-between font-medium py-4`,
};

const TaskStatusSection = ({ title, onDelete, selectedStatus }) => {
  const { taskList, handleOpenTask } = useContext(TaskContext);
  const filteredTasks = taskList.filter(
    (task) => task && task.status === selectedStatus
  );

  return (
    <div className={style.subTitleBg}>
      <div className={style.subTitleSpacing}>
        <span>{title}</span>
        <div className={style.subIconContainer}>
          <button className="focus:outline-none" onClick={handleOpenTask}>
            {/* {additionIcon()} */}
            additionIcon
          </button>
          <div className="pt-1">
            <HideStatus />
          </div>
        </div>
      </div>
      <TaskCard taskList={filteredTasks} onDelete={onDelete} />
    </div>
  );
};

export default TaskStatusSection;
