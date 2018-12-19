import React from "react";

const DeletePopUp = ({ photoUrl, handleDelete, closeDeletePopUp }) => {
  return (
    <div>
      {" "}
      <div className="deleteQuestion">
        {" "}
        Are you sure you want to delete this photo?{" "}
      </div>
      <img className="deletePhoto" src={photoUrl} alt="" />
      <div className="answerButtons">
        <button className="yesButton" onClick={handleDelete}>
          {" "}
          Yes{" "}
        </button>{" "}
        <button className="noButton" onClick={closeDeletePopUp}>
          {" "}
          No{" "}
        </button>{" "}
      </div>
    </div>
  );
};

export default DeletePopUp;
