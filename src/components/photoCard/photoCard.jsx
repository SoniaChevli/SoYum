import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { API_ROOT } from "../../api-config";
import axios from "axios";
import AddFavorite from "../favoritePhoto/addToFavorite";
import "../../styles/photoPage.css";
import PhotoHashTags from "./photoHashTags";
import PhotoInformation from "./photoInformation";

const photoApiEndPoint = API_ROOT + "photos/";
const userApiEndPoint = API_ROOT + "users/me";
class Photo extends Component {
  state = {
    photoData: {
      restaurantName: "None",
      restaurantLink: "",
      author: "None",
      city: "None",
      description: "None",
      _id: "None",
      tags: [],
      favorites: []
    },
    loggedInUser: {
      id: "None",
      favoritedPhoto: false
    },
    errorMessageBox: {
      displayUserIdError: false,
      errorMessageUserId:
        "There was an error properly loading this page. Please try again later..."
    },
    redirect: false
  };

  componentDidMount() {
    this.retrievePhotoData();
    this.retrieveUserFavoriteInfo();
  }
  retrievePhotoData = () => {
    const photoIdApiEndPoint = photoApiEndPoint + this.props.location.pathname;
    axios
      .get(photoIdApiEndPoint)
      .then(res => {
        const photoData = res.data;
        this.setState({ photoData });
      })
      .catch(err => {
        console.log("ERR", err);
      });
  };
  retrieveUserFavoriteInfo = () => {
    if (localStorage.getItem("jwtToken")) {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("jwtToken")
        }
      };
      axios
        .get(userApiEndPoint, config)
        .then(res => {
          let loggedInUserId = res.data._id;
          let favoritedPhoto = false;
          if (this.state.photoData.favorites.includes(loggedInUserId))
            favoritedPhoto = true;
          this.setState({
            loggedInUser: { id: loggedInUserId, favoritedPhoto }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleFavorite = () => {
    const loggedInUser = { ...this.state.loggedInUser };
    loggedInUser["favoritedPhoto"] = !loggedInUser["favoritedPhoto"];
    this.setState({ loggedInUser });
  };

  closeMessageBox = async () => {
    let errorMessageBox = { ...this.state.errorMessageBox };
    errorMessageBox["displayUserIdError"] = false;
    let redirect = true;
    this.setState({ errorMessageBox, redirect });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect to="/main" />;
    }
  };

  render() {
    return (
      <div className="photoPage">
        {this.renderRedirect()}
        <img id="photoPageImage" src={this.state.photoData.photo} alt="" />
        {this.state.loggedInUser.id !== "None" ? (
          <AddFavorite
            starClassName="starPhotoPage"
            favoritesArray={this.state.photoData.favorites}
            currentUserId={this.state.loggedInUser.id}
            handleFavorite={this.handleFavorite}
            photoId={this.state.photoData._id}
            favoritedPhoto={this.state.loggedInUser.favoritedPhoto}
          />
        ) : null}
        <div className="photoInformation">
          <PhotoInformation photoData={this.state.photoData} />
          <PhotoHashTags tags={this.state.photoData.tags} />
          <div id="authorFull">
            Picture taken by: {this.state.photoData.author.userName}
          </div>
        </div>
      </div>
    );
  }
}

export default Photo;
