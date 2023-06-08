import React, { useState } from "react";
// import { settingsIcon } from "../Svg";

const style = {
  hideStatusBg: `border bg-gray-40 px-3 py-1 rounded absolute  top-9 right-1 shadow-xs hover:bg-gray-50 hover:shadow active:shadow-xs active:bg-gray-40`,
};

const HideStatus = () => {
  const [hideStatus, setHideStatus] = useState(false);

  const handleHideStatus = () => {
    setHideStatus(!hideStatus);
  };

  return (
    <>
      <div className="relative">
        <button onClick={handleHideStatus}>
          {/* {settingsIcon()} */}
          settingsIcon
        </button>
        {hideStatus && <button className={style.hideStatusBg}>Hide</button>}
      </div>
    </>
  );
};

export default HideStatus;
