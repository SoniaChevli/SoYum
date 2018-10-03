import React, { Component } from "react";
import axios from "axios";
import starYellow from "../icons/star_yellow_solid.png";
import starOutline from "../icons/star_outline.png";

let apiEndPoint = "https://soyumapi.herokuapp.com/api/photos/favorite/";

class AddFavorite extends Component {
  state = {
    favoritePhoto: false,
    loggedIn: true
  };

  //   defaultStar = () => {
  //     console.log("mounting", this.props.photoId);
  //     console.log("after mounting", this.props.favoritesArray);
  //     console.log(
  //       "check",
  //       this.props.favoritesArray.includes(this.props.currentUserId)
  //     );
  //     if (this.props.favoritesArray.includes(this.props.currentUserId)) {
  //       this.setState({ favoritePhoto: true });
  //     }
  //   };

  handleStarClick = () => {
    console.log("preclick array", this.props.favoritesArray);
    const favoritePhoto = this.props.favoritedPhoto;

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };
    const obj = {
      photoId: this.props.photoId,
      currentUserId: this.props.currentUserId
    };
    apiEndPoint += this.props.photoId;
    axios
      .put(apiEndPoint, obj, config)
      .then(res => console.log("add photofavorite", res))
      .catch(err => console.log("add photofavorite err", err));

    // make axios request to post to photo adding id to array
  };

  render() {
    const { photoId, favoritesArray, starClassName } = this.props;

    return (
      <div className="favoriteStarComponent">
        {this.props.favoritedPhoto ? (
          <img
            className={starClassName}
            src={starYellow}
            alt=""
            onClick={() => {
              this.props.handleFavorite();
              this.handleStarClick();
            }}
          />
        ) : (
          <img
            className={starClassName}
            src={starOutline}
            alt=""
            onClick={() => {
              this.props.handleFavorite();
              this.handleStarClick();
            }}
          />
        )}
      </div>
    );
  }
}

export default AddFavorite;
