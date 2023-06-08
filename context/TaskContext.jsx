"use client";

import React, { useState, useEffect, createContext } from "react";

const useLocalState = (key, initial) => {
  //////////////////////////////////////////////////////////////
  // plan to utilize node server. "window" will not work in nextjs
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    }
    return initial;
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
  return [value, setValue];
};
//////////////////////////////////////////////////////////////

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useLocalState("my-todo-list", []);
  const [selectedTaskForPage, setSelectedTaskForPage] = useState(null);
  const [showDateTime, setShowDateTime] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const [showComplexity, setShowComplexity] = useState(true);
  const [isCmdPalette, setIsCmdPalette] = useState(false);

  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleToggleDateTime = () => {
    setShowDateTime(!showDateTime);
  };

  const handleTogglePriority = () => {
    setShowPriority(!showPriority);
  };

  const handleToggleComplexity = () => {
    setShowComplexity(!showComplexity);
  };

  const handleOpenTask = (e) => {
    setShowTaskForm(true);
  };

  const getSelectedTask = (taskId) => {
    console.log(
      "inside the context",
      taskId,
      taskList[0].id,
      taskId === taskList[0].id,
      taskList.find((task) => task.id === taskId)
    );
    setSelectedTaskForPage(taskList.find((task) => task.id === taskId));
  };

  return (
    <TaskContext.Provider
      value={{
        taskList,
        setTaskList,
        setSelectedTaskForPage,
        selectedTaskForPage,
        getSelectedTask,
        showDateTime,
        handleToggleDateTime,
        showComplexity,
        handleToggleComplexity,
        showPriority,
        handleTogglePriority,
        handleOpenTask,
        isCmdPalette,
        setIsCmdPalette,
        setShowTaskForm,
        showTaskForm,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
