import React from "react";
import DeleteButton from "../../icons/delete.png";

const ProfileImages = ({ photos, handleDeleteClick }) => {
  return (
    <div>
      {photos.map(d => (
        <div className="imagesDelete" key={d._id}>
          <img
            name="profilePagePhotos"
            src={d.photo}
            id={d._id}
            author={d.author._id}
            alt=""
          />
          <img
            src={DeleteButton}
            id="deleteButton"
            alt=""
            onClick={() => handleDeleteClick(d)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileImages;
