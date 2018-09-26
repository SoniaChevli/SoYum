import React from "react";

const Input = ({ label, type, name, _id, handleChange }) => {
  return (
    <label id={_id} style={{ marginBottom: "20px" }}>
      {" "}
      {label}
      <br />
      <input type={type} name={name} onChange={handleChange} />
    </label>
  );
};

export default Input;
