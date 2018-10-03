import React from "react";
import "../../styles/mainPage.css";

const Input = ({ label, type, name, _id, handleChange, placeholder }) => {
  return (
    <label id={_id} style={{ marginBottom: "20px" }}>
      {" "}
      {label}
      <br />
      <input
        type={type}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </label>
  );
};

export default Input;
