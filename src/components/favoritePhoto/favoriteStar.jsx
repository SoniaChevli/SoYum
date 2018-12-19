import React from "react";
import starYellow from "../../icons/star_yellow_solid.png";
import starOutline from "../../icons/star_outline.png";

const FavoriteStar = ({
  favoritedPhoto,
  handleStarClick,
  handleFavorite,
  starClassName
}) => {
  return (
    <div>
      {favoritedPhoto ? (
        <img
          className={starClassName}
          src={starYellow}
          alt=""
          onClick={() => {
            handleFavorite();
            handleStarClick();
          }}
        />
      ) : (
        <img
          className={starClassName}
          src={starOutline}
          alt=""
          onClick={() => {
            handleFavorite();
            handleStarClick();
          }}
        />
      )}
    </div>
  );
};

export default FavoriteStar;
