import React, { Component } from "react";
import axios from "axios";
import starYellow from "../icons/star_yellow_solid.png";
import starOutline from "../icons/star_outline.png";
import MessageBox from "./common/messageBox";
import { API_ROOT } from "../api-config";

let apiEndPoint = API_ROOT + "photos/favorite/";

class AddFavorite extends Component {
  state = {
    favoritePhoto: false,
    loggedIn: true,
    errorAddingFavorite: false
  };

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
      .catch(err => {
        console.log("add photofavorite err", err);
        this.setState({ errorAddingFavorite: true });
      });

    // make axios request to post to photo adding id to array
  };
  closeMessageBox = () => {
    this.setState({ errorAddingFavorite: false });
  };

  render() {
    const { starClassName } = this.props;

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
        {this.state.errorAddingFavorite ? (
          <MessageBox
            messageBox="favoritesMessageBox"
            messageClassName="favoritesError"
            message="There was an error adding this photo to your favorites."
            closeMessageBox={this.closeMessageBox}
            buttonClassName="favoritesBoxButton"
          />
        ) : null}
      </div>
    );
  }
}

export default AddFavorite;
