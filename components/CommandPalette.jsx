import React, { useContext, useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { Dialog, Combobox, Transition } from "@headlessui/react";
// import { SearchIcon } from "../Svg";


const CommandPalette = () => {
  const { taskList, isCmdPalette, setIsCmdPalette, setSelectedTaskForPage } = useContext(TaskContext);
  const [query, setQuery] = useState("");

  const filteredTaskTitle = query
    ? taskList.filter((task) =>
        task.taskName.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  const history = useHistory();
  

  const handleChange = (task) => {
    setIsCmdPalette(false);
    setSelectedTaskForPage(null);
    history.push(`/tasks/${task.id}`);
  };
    
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        setIsCmdPalette(!isCmdPalette);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCmdPalette]);

  return (
    <Transition.Root show={isCmdPalette} as={Fragment} afterLeave={()=>{setQuery("")}}>
      <Dialog
        onClose={setIsCmdPalette}
        className=" fixed inset-0 p-4 pt-[25vh] overflow-y-auto"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75">
            <Transition.Child
              enter="duration-30 ease-in"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Combobox
                onChange={handleChange}
                as="div"
                className="realtive bg-white max-w-xl mx-auto mt-[25vh] rounded-xl shadow-2xl ring-1 ring-black/5 focus:ring-0 divide-y divide-gray-100 overflow-hidden"
              >
                <div className="flex items-center px-4">
                  {SearchIcon()}
                  <Combobox.Input
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    className=" w-full bg-transparent border-0  focus:outline-none text-med py-1 px-2 text-gray-800 placeholder:text-gray-400 h-12"
                    placeholder="Search..."
                  />
                </div>
                {filteredTaskTitle.length > 0 && (
                  <div className="py-4 text-sm max-h-60 overflow-y-auto">
                    {filteredTaskTitle.map((task) => (
                      <Combobox.Option
                        className="list-none"
                        key={task.id}
                        value={task}
                      >
                        {({ active }) => (
                          <div
                            className={`px-4 py-0.5 space-x-1 ${
                              active ? "bg-indigo-600" : "bg-white"
                            }`}
                          >
                            <span
                              className={`font-md  ${
                                active ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {task.taskName.toUpperCase()}
                            </span>
                            <span
                              className={
                                active ? "text-indigo-200" : "text-gray-400"
                              }
                            >
                              in {task.status}
                            </span>
                          </div>
                        )}
                      </Combobox.Option>
                    ))}
                  </div>
                )}
                {query && filteredTaskTitle.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">No results found.</p>
                )}
              </Combobox>
            </Transition.Child>
          </Dialog.Overlay>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
