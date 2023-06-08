import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
// import { CmdIcon } from "../Svg";

const Navbar = () => {
  const { isCmdPalette, setIsCmdPalette, handleOpenTask } =
    useContext(TaskContext);
  return (
    <div className="bg-skin-fill border border-l-2  w-[330px] h-screen flex flex-col justify-between	">
      <div className="flex flex-col gap-4 pt-6 items-center">
        <span>project Tasklist</span>

        <div className="flex flex-row gap-2">
          <button
            onClick={handleOpenTask}
            className="pr-36 pl-2 border shadow-lg rounded-md focus:outline-none"
          >
            <span>New Task</span>
          </button>

          <div>
            <button
              onClick={() => {
                setIsCmdPalette(!isCmdPalette);
              }}
            >
              <span className=" rounded-md border px-2 shadow-lg focus:outline-none flex flex-row itens-center space-x-10 ">
                <span className="text-gray-400">K</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center pb-6 ">
        <span>Invite people</span>
        <span>Help & support</span>
      </div>
    </div>
  );
};

export default Navbar;
