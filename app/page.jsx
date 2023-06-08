"use client";

import React, { useContext, useEffect, useState } from "react";
import { Droppable, DragDropContext } from "@hello-pangea/dnd";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskStatusSection from "../components/TaskStatus";
import Filter from "../components/Filter";

const style = {
  homeBg: `flex flex-col w-[calc(100%-330px)] h-screen bg-skin-fillHome`,
  subTitleContainer: `flex flex-row h-[inherit] overflow-auto mb-4 pl-6`,
};

export default function Home() {
  const {
    taskList,
    setTaskList,
    handleOpenTask,
    setShowTaskForm,
    showTaskForm, 
  } = useContext(TaskContext);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showTaskForm === true) {
        handleClose();
      } else if (
        (e.key === "c" || e.key === "C") &&
        e.shiftKey &&
        showTaskForm === false
      ) {
        handleOpenTask();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showTaskForm]);

  const handleClose = () => {
    setShowTaskForm(false);
  };

  const handleSaveTask = (taskItem, status) => {
    const newTask = {
      ...taskItem,
      status: status === "backlog" ? "backlog" : "todo",
    };
    setTaskList((prevTaskList) => [...prevTaskList, newTask]);
    setShowTaskForm(false);
    handleClose();
  };

  const handleDeleteTask = (taskId) => {
    setTaskList((prevTaskList) =>
      prevTaskList.filter((item) => item && item.id !== taskId)
    );
  };

  const taskStatusSection = [
    { id: 0, status: "backlog", title: "Backlog" },
    { id: 1, status: "todo", title: "To Do" },
  ];

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If the destination is null or the same as the source, do nothing
    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    // Find the task being dragged
    const task = taskList.find((task) => task && task.id === draggableId);

    // Check if the task is found
    if (!task) {
      return;
    }

    // Update the status of the dragged task
    const updatedTask = { ...task, status: destination.droppableId };

    // Find the index of the task in the source and destination lists
    const sourceIndex = taskList.findIndex(
      (task) => task && task.id === draggableId
    );
    const destinationIndex = taskList.findIndex(
      (task) => task && task.id === draggableId
    );

    // Update the task list with the moved task
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(sourceIndex, 1);
    updatedTaskList.splice(destinationIndex, 0, updatedTask);

    // Update the task list state
    setTaskList(updatedTaskList);
  };
  console.log("test", showTaskForm)
  return (
    <div className={style.homeBg}>
      <div className="bg-skin-fill flex flex-row items-center justify-between pl-5 py-6">
        <div></div>

        <div>
          <Filter />
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={style.subTitleContainer}>
          <Droppable droppableId="backlog">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...provided.droppableProps}
                className={`${snapshot.isDraggingOver ? "bg-white" : ""}`}
              >
                <TaskStatusSection
                  key="backlog"
                  title="Backlog"
                  selectedStatus="backlog"
                  onDelete={(task) => handleDeleteTask(task.id)}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="todo">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${snapshot.isDraggingOver ? "bg-white" : ""}`}
              >
                <TaskStatusSection
                  key="todo"
                  title="To Do"
                  selectedStatus="todo"
                  onDelete={(task) => handleDeleteTask(task.id)}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <div
        className={`fixed inset-0 flex justify-center items-center z-50 ${
          // true ? "visible" : "invisible"
          showTaskForm ? "visible" : "invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div
          className={`relative transition-transform duration-500 ${
            // true ? "translate-y-0" : "translate-y-full"
            showTaskForm ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <TaskForm
            onDiscard={handleClose}
            onClose={handleClose}
            onSave={handleSaveTask}
          />
        </div>
      </div>
    </div>
  );
}
