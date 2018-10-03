import React from "react";
import "../styles/selectedFilters.css";

const SelectedFilters = ({ toggled, handleFilterClick, handleAllClick }) => {
  return (
    <div>
      <div id="selectedFilters">
        <div id="filtersSelectedTitle"> Filters Selected: </div>
        <div id="filtersSelectedList">
          {" "}
          {toggled.length === 0 ? "No filters Selected." : ""}
          {toggled.join(", ")}
        </div>{" "}
        <br />
      </div>
      <div id="resetButtons">
        <button id="resetFilters" onClick={handleFilterClick}>
          {" "}
          Reset Filters{" "}
        </button>

        <button id="resetAll" onClick={handleAllClick}>
          {" "}
          Show All{" "}
        </button>
      </div>
    </div>
  );
};

export default SelectedFilters;
