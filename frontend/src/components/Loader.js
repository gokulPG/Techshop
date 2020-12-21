import React from "react";
import "../css/loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <svg className="loader-css" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <circle
          id="c"
          fill="none"
          stroke-width="4"
          stroke-linecap="round"
          stroke="black"
          cx="45"
          cy="45"
          r="43"
        />
      </svg>
    </div>
  );
};

export default Loader;
