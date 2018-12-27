import React from "react";

const PhotoInformation = ({ photoData }) => {
  return (
    <div>
      <header id="imageHeader">
        <div id="restaurantNameFull">
          {photoData.restaurantLink ? (
            <a
              href={photoData.restaurantLink}
              id="restName"
              className="restLink"
            >
              {" "}
              {photoData.restaurantName}
            </a>
          ) : (
            <div id="restName"> {photoData.restaurantName} </div>
          )}
        </div>
      </header>

      <div id="cityNameFull">{photoData.city}</div>
      <div id="descriptionFull">
        {" "}
        <br />
        {photoData.description}
      </div>
    </div>
  );
};

export default PhotoInformation;
