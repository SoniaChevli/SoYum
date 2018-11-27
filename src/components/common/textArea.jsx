import React from "react";

const TextArea = ({
  textAreaClassName,
  _id,
  name,
  handleChange,
  placeholder
}) => {
  return (
    <label className={textAreaClassName}>
      {" "}
      Bio:
      <br />
      <textarea
        id={_id}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </label>
  );
};

export default TextArea;
