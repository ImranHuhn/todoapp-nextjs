import React from "react";

const style = {
  container: `flex flex-row gap-2`,
  button: `bg-gray-700 text-gray-100 hover:bg-sky-400 hover:shadow-lg hover:ring-1 ring-black/5 active:bg-sky-500 active:scale-110 active:shadow-none rounded-full w-8 h-8 px-1 py-1 text-xs`,
};
const PriorityButtons = ({ onSelect }) => {
  const handleClick = (value) => {
    const priorityText = priorityLevel(value);
    onSelect(priorityText);
  };

  const priorityLevel = (value) => {
    if (value >= 1 && value <= 3) {
      return "Low ";
    }
    if (value >= 4 && value <= 6) {
      return "Medium ";
    }
    if (value === 7 || value === 8) {
      return "High ";
    }
    if (value === 9 || value === 10) {
      return "Critical";
    }
  };

  return (
    <div className={style.container}>
      <button onClick={() => handleClick(1)} className={style.button}>
        1
      </button>
      <button onClick={() => handleClick(2)} className={style.button}>
        2
      </button>
      <button onClick={() => handleClick(3)} className={style.button}>
        3
      </button>
      <button onClick={() => handleClick(4)} className={style.button}>
        4
      </button>
      <button onClick={() => handleClick(5)} className={style.button}>
        5
      </button>
      <button onClick={() => handleClick(6)} className={style.button}>
        6
      </button>
      <button onClick={() => handleClick(7)} className={style.button}>
        7
      </button>
      <button onClick={() => handleClick(8)} className={style.button}>
        8
      </button>
      <button onClick={() => handleClick(9)} className={style.button}>
        9
      </button>
      <button onClick={() => handleClick(10)} className={style.button}>
        10
      </button>
    </div>
  );
};

export default PriorityButtons;
