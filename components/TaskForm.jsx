import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PriorityButtons from "../components/PriorityButtons";
import ComplexityButtons from "../components/ComplexityButtons";
import SubTaskList from "../components/SubTaskList";


const statusOptions = [
  { label: "BackLog", value: "backlog" },
  { label: "Pending", value: "pending" },
  { label: "To Do", value: "todo" },
  { label: "Complete", value: "complete" },
];

const TaskForm = ({ onDiscard, onSave, onClose }) => {
  const [inputTask, setInputTask] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [priority, setPriority] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [inputTags, setInputTags] = useState("");
  const [status, setStatus] = useState("todo");
  const [subTaskList, setSubTaskList] = useState([]);


  const handleChangeTask = (e) => {
    setInputTask(e.target.value);
  };

  const handleChangeDate = (e) => {
    setInputDate(e.target.value);
  };

  const handleChangeTime = (e) => {
    setInputTime(e.target.value);
  };

  const handleChangePriority = (selectedPriority) => {
    setPriority(selectedPriority);
  };

  const handleChangeComplexity = (selectedComplexity) => {
    setComplexity(selectedComplexity);
  };

  const handleChangeTags = (e) => {
    setInputTags(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleAddSubtask = (subtask) => {
    const newSubTaskList = [...subTaskList, subtask];
    setSubTaskList(newSubTaskList);
  };

  const handleDiscard = () => {
    onDiscard();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      inputTask &&
      priority &&
      complexity &&
      inputDate &&
      inputTime &&
      inputTags &&
      subTaskList.length > 0 &&
      status
    ) {
      const taskItem = {
        taskName: inputTask,
        priority: priority,
        complexity: complexity,
        date: inputDate,
        time: inputTime,
        tags: inputTags,
        subTaskList: subTaskList,
        status: status,
        id: uuidv4(),
      };

      setSubTaskList([]);
      setInputTask("");
      setInputDate("");
      setInputTime("");
      setPriority(null);
      setComplexity(null);
      setInputTags("");

      onSave(taskItem, status);
      onClose();

    }
  };

  return (
    <div>
      <div className="flex flex-col border px-4 py-4 border-white bg-gray-200 rounded gap-4">
        <div className="flex w-full justify-center space-x-10">
          <span className=" flex justify-center basic-1/2 py-2 text-lg text-black">
            Add New task
          </span>
        </div>
        <div className="text-gray-700 mx-2 ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>Task Name</div>
            <input
              name="inputTask"
              value={inputTask}
              onChange={handleChangeTask}
              className="bg-white border-gray-600 rounded-full py-2 pr-1 pl-4 text-sm w-full"
              placeholder="Enter your task here..."
              type="text"
            />
            <div className="flex flex-col gap-2">
              <span className="text-sm">Select Priority Level</span>
              <PriorityButtons name="priorty" onSelect={handleChangePriority} />
            </div>
            <div className="flex flex-col gap-2">
              <span>Select the complexity Level</span>
              <ComplexityButtons
                name="complexity"
                onSelect={handleChangeComplexity}
              />
            </div>
            <div className="flex flex-row justify-center gap-12">
              <div className=" flex flex-col w-1/3 justify-center gap-2	">
                <span className="">Select Due Date</span>
                <span>
                  <input
                    name="inputDate"
                    value={inputDate}
                    onChange={handleChangeDate}
                    className=" bg-white dateClass rounded-full p-1 text-sm "
                    style={{ paddingLeft: "10px" }}
                    type="date"
                  />
                </span>
              </div>
              <div className=" flex flex-col w-1/3 justify-center gap-2	">
                <span className="">Select Time</span>
                <input
                  name="inputTime"
                  value={inputTime}
                  onChange={handleChangeTime}
                  className="bg-white rounded-full p-1 text-sm"
                  style={{ paddingLeft: "10px" }}
                  type="time"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span>Add Checklist for subtasks</span>
              <SubTaskList
                onAddSubtask={handleAddSubtask}
                subtasks={subTaskList}
              />

              <ul>
                {subTaskList.map((taskItem, index) => (
                  <li className="bg-white rounded-full py-1 pl-4 pr-2 my-2" key={index}>
                    {taskItem}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <span>Add Tags</span>
              <input
                name="inputTags"
                value={inputTags}
                onChange={handleChangeTags}
                className="  bg-white px-2 py-1 rounded-full"
                placeholder=" Add tags here.."
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>Select Status</span>
              <select
                name="status"
                value={status}
                onChange={handleStatusChange}
                className="bg-white px-2 py-1 rounded-full"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
              </select>
            </div>

            <div className="flex justify-center gap-10">
              <button
                onClick={handleDiscard}
                className=" w-40 rounded-full text-white bg-gray-500 hover:bg-red-600 hover:shadow-lg"
              >
                {" "}
                Discard
              </button>
              <button
                type="submit"
                className=" w-40 rounded-full text-white bg-gray-500 hover:bg-sky-500 hover:shadow-lg"
              >
                Save task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
