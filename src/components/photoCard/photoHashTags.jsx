import React from "react";

const PhotoHashTags = ({ tags }) => {
  return (
    <div id="tagsFull">
      {" "}
      {tags.map(t => (
        <li id="hashTag" key={t.replace(/\s/g, "")}>
          #{t.replace(/\s/g, "")}
        </li>
      ))}{" "}
    </div>
  );
};

export default PhotoHashTags;
