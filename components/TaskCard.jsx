import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { TaskContext } from "../context/TaskContext";
import { Draggable } from "@hello-pangea/dnd";
// import {
//   taskIcon,
//   deleteIcon,
//   dueDateIcon,
//   priorityIcon,
//   complexityIcon,
// } from "../Svg";
import DeleteConfirmCard from "./DeleteConfirmCard";

const TaskCard = ({ onDelete, taskList }) => {
  const { setSelectedTaskForPage, showDateTime, showComplexity, showPriority } = useContext(TaskContext);

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [deleteFade, setDeleteFade] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
 

  const handleDelete = () => {
    onDelete(selectedTask);
    setShowDeleteCard(false);
    setDeleteFade(false);
  };

  const handleOpenDeleteCard = (task) => {
    setShowDeleteCard(true);
    setDeleteFade(true);
    setSelectedTask(task);
  };

  const handleCloseDeleteCard = () => {
    setShowDeleteCard(false);
    setDeleteFade(false);
  };

  const handleShowDateTime =() =>{
    setShowDeleteCard(!showDateTime)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "Escape" || e.key === "Esc") && showDeleteCard === true) {
        handleCloseDeleteCard();
      }
      document.addEventListener("keydown", this.handleKeyDown);

      return () => {
        document.removeEventListener("keydown", this.handleKeyDown);
      };
    };
  }, [showDeleteCard]);

  return (
    <>
      {taskList.map((task, index) => (
        <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Link
                href={`/tasks/${task.id}`}
                onClick={() => setSelectedTaskForPage(task)}
              >
                <div
                  key={task.id}
                  className="flex flex-col justify-center w-[19.5rem] pl-4 pt-0.5 pb-1 text-blue bg-white rounded-lg shadow-lg"
                >
                  <div className="flex flex-row justify-between py-3">
                    <div className="flex flex-row gap-2 text-base">
                      <div className="pt-1">{taskIcon()}</div>
                      <span>Task: {task.taskName}</span>
                    </div>
                    <div className="flex flex-row gap-2 pr-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenDeleteCard(task);
                        }}
                      >
                        {deleteIcon()}
                      </button>
                    </div>
                  </div>
                  {showDateTime && (
                    <div className="flex flex-row gap-2 pb-1 text-sm">
                      <div className="pt-1">{dueDateIcon()}</div>
                      <span>
                        Due Date: {task.date} at {task.time}
                      </span>
                    </div>
                  )}

                  {showPriority && (
                    <div className="flex flex-row gap-2 pb-1 text-sm">
                    <div className="pt-1">{priorityIcon()}</div>
                    <span>Priority: {task.priority}</span>
                  </div>

                  )}

                  {showComplexity && (
                    <div className="flex flex-row gap-2 pb-1 text-sm">
                    <div className="pt-1">{complexityIcon()}</div>
                    <span>Complexity: {task.complexity}</span>
                  </div>

                  )}
                  
                  
                </div>
              </Link>
            </div>
          )}
        </Draggable>
      ))}
      {showDeleteCard && (
        <div
          className={`fixed inset-0 z-50 flex justify-center items-center ${
            deleteFade
              ? "opacity-100 transition-opacity"
              : "opacity-0 transition-opacity"
          } `}
        >
          <DeleteConfirmCard
            task={selectedTask}
            onDelete={handleDelete}
            onClose={handleCloseDeleteCard}
          />
        </div>
      )}
    </>
  );
};

export default TaskCard;
