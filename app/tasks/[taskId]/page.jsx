"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { TaskContext } from "@/context/TaskContext";
import {
  backChevron,
  menuLeft,
  taskPageTaskIcon,
  dateTimeIcon,
  priorityIcon,
  complexityIcon,
  labelIcon,
  subTaskIcon,
} from "@/components/Svg";

const style = {
  topBg: `flex flex-row justify-between mx-6 mt-2 mb-4`,
  homeContainer: ` flex flex-row gap-6`,
  subTaskTitle: `flex flex-row items-center justify-start	gap-2`,
  subtaskItemBg: `hover:bg-gray-80 hover:rounded-sm my-1 p-1 hover:shadow-gray-50 shadow-sm`,
  containerSpacings: `flex flex-row gap-2 mx-6 items-center my-2`,
  taskTitleBg: `flex flex-row gap-2 items-center py-4 border-b border-gray-100 border-opacity-20 text-lg`,
  subtaskContainerSpacing: `flex flex-col gap-2 mx-6  my-2 `,
  spacingBetweenContainers: `flex flex-col border-t border-gray-100 `,
};
const TaskPage = (props) => {
  const { taskList, selectedTaskForPage, getSelectedTask } =
    useContext(TaskContext);

  const task = selectedTaskForPage;

  return (
    <div className="overflow-x-hidden	">
      <div className={style.topBg}>
        <div className={style.homeContainer}>
          {menuLeft()}
          <Link href="/">{backChevron()}</Link>
        </div>
      </div>
      <div className={style.taskTitleBg}>
        <div className="items-center ml-6	">{taskPageTaskIcon()}</div>
        <div>{task && <p>{task.taskName} </p>}</div>
      </div>

      <div className="flex flex-col gap-36">
        <div className={style.spacingBetweenContainers}>
          <div className="w-full mx-4 overflow-x-hidden my-4	">
            <span>Task Completed</span>
            <div className="bg-gray-100 w-[95%] h-5 rounded-2xl mt-2"></div>
          </div>

          <div className={style.subtaskContainerSpacing}>
            <div className={style.subTaskTitle}>
              <span>{subTaskIcon()}</span>
              <p>Sub tasks</p>
            </div>
            <div className="pl-6">
              {task && (
                <>
                  <ul>
                    {task.subTaskList.map((subtask, index) => {
                      return (
                        <li className={style.subtaskItemBg} key={index}>
                          {subtask}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={style.spacingBetweenContainers}>
          <div className={style.containerSpacings}>
            <span>{dateTimeIcon()}</span>
            {task && (
              <p>
                Due Date:{task.date} at {task.time}
              </p>
            )}
          </div>
          <div className={style.containerSpacings}>
            <span>{priorityIcon()}</span>
            {task && <p>Priority:{task.priority} </p>}
          </div>
          <div className={style.containerSpacings}>
            <span>{complexityIcon()}</span>

            {task && <p>Complexity:{task.complexity} </p>}
          </div>
          <div className={style.containerSpacings}>
            <span>{complexityIcon()}</span>
            {task && <p>Status:{task.status} </p>}
          </div>
          <div className={style.containerSpacings}>
            <span>{labelIcon()}</span>
            {task && <p>Tag:{task.tags} </p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
