import React from "react";
import "../styles/imageForm.css";

const input = ({ label, type, name, _id }) => {
  return (
    <label id={_id}>
      {" "}
      {label}
      <br />
      <input type={type} name={name} />
    </label>
  );
};

export default input;
