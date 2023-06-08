import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
// import { displayIcon, downIcon } from "../Svg";
const style = {
  buttonBg: `bg-gray-100 border border-solid rounded flex flex-row gap-2 items-center px-1 py-0.5 text-sm shadow-md hover:bg-gray-200 hover:shadow-lg active:shadow-sm `,
  popUpBg: `bg-gray-100 border border-solid rounded px-2 py-0.5 shadow transition-opacity duration-300 absolute w-[200px] z-9 top-[30px] `,
  layoutText: `text-gray-700 text-sm `,
  displayText: `text-gray-700 text-sm pb-1 `,
  buttonItem: `text-gray-700 text-sm hover:bg-gray-500 hover:text-gray-100 w-full text-start	`,
};
const Filter = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { handleToggleDateTime, handleToggleComplexity, handleTogglePriority } =
    useContext(TaskContext);

  const handleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  return (
    <div className="mr-6 flex flex-col gap-2 items-end relative ">
      <div className="group" onClick={handleDropDown}>
        <button className={style.buttonBg}>
          {/* {displayIcon()} */}
          <span> Display</span>
          {/* {downIcon()} */}
        </button>
      </div>
      {dropDownOpen && (
        <div className={style.popUpBg}>
          <div className=" flex flex-row justify-between	items-center my-1 gap-2">
            <span className={style.layoutText}>Layout</span>
            <div className="">
              <button className="border bg-green px-1 mr-1 text-sm">List</button>
              <button className="border bg-red px-1 text-sm">Board</button>
            </div>
          </div>

          <div className="my-1 border-b">
            <span className={style.displayText}>Display Properties</span>
          </div>

          <ul>
            <li>
              <button
                className={style.buttonItem}
                onClick={handleTogglePriority}
              >
                Priority
              </button>
            </li>
            <li>
              <button
                className={style.buttonItem}
                onClick={handleToggleComplexity}
              >
                Complexity
              </button>
            </li>
            <li>
              <button
                className={style.buttonItem}
                onClick={handleToggleDateTime}
              >
                Date and Time
              </button>
            </li>
            <li>
              <button className={style.buttonItem}>Tags</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
