import React, { Component } from "react";
import axios from "axios";
import FavoriteStar from "./favoriteStar";
import MessageBox from "../common/messageBox";
import { API_ROOT } from "../../api-config";

let apiEndPoint = API_ROOT + "photos/favorite/";

class AddFavorite extends Component {
  state = {
    favoritePhoto: false,
    loggedIn: true,
    errorAddingFavorite: false
  };

  handleStarClick = () => {
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
      .then(res => {})
      .catch(err => {
        this.setState({ errorAddingFavorite: true });
      });
  };

  closeMessageBox = () => {
    this.setState({ errorAddingFavorite: false });
  };

  render() {
    const { starClassName } = this.props;

    return (
      <div className="favoriteStarComponent">
        <FavoriteStar
          favoritedPhoto={this.props.favoritedPhoto}
          handleStarClick={this.handleStarClick}
          handleFavorite={this.props.handleFavorite}
          starClassName={starClassName}
        />

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
