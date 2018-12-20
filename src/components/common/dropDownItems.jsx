import React from "react";

const DropDownItems = ({ menuItems, selectedElements, handleSelect }) => {
  return (
    <ul>
      {menuItems.map(d => (
        <li id="dropList" key={d}>
          <input
            type="checkbox"
            onChange={() => {}}
            checked={selectedElements.includes(d)}
            onClick={e => {
              handleSelect(e, d);
            }}
          />
          <label style={{ marginLeft: "6px" }}> {d}</label>
        </li>
      ))}
    </ul>
  );
};

export default DropDownItems;
