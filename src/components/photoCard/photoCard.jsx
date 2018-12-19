import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { API_ROOT } from "../../api-config";
import axios from "axios";
import AddFavorite from "../favoritePhoto/addToFavorite";
import "../../styles/photoPage.css";

let photoApiEndPoint = API_ROOT + "photos/";
const userApiEndPoint = API_ROOT + "users/me";
class Photo extends Component {
  state = {
    data: {
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
    let photoIdApiEndPoint = photoApiEndPoint + this.props.location.pathname;

    axios
      .get(photoIdApiEndPoint)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
      .catch(err => {
        console.log("ERR", err);
      });
    if (localStorage.getItem("jwtToken")) {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("jwtToken")
        }
      };

      axios
        .get(userApiEndPoint, config)
        .then(async res => {
          let loggedInUserId = res.data._id;
          let favoritedPhoto = false;
          if (this.state.data.favorites.includes(loggedInUserId))
            favoritedPhoto = true;
          this.setState({
            loggedInUser: { id: loggedInUserId, favoritedPhoto }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleTags = () => {
    const tags = this.state.data.tags;
    if (tags.length !== 0) {
      const final = tags.map(t => (
        <div
          class={t.replace(/\s/g, "")}
          id="hashTags"
          key={t.replace(/\s/g, "")}
        >
          #{t.replace(/\s/g, "")}
        </div>
      ));
      return final;
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
        <img id="photoPageImage" src={this.state.data.photo} alt="" />
        {this.state.loggedInUser.id !== "None" ? (
          <AddFavorite
            starClassName="starPhotoPage"
            favoritesArray={this.state.data.favorites}
            currentUserId={this.state.loggedInUser.id}
            handleFavorite={this.handleFavorite}
            photoId={this.state.data._id}
            favoritedPhoto={this.state.loggedInUser.favoritedPhoto}
          />
        ) : null}
        <div className="photoInformation">
          <header id="imageHeader">
            <div id="restaurantNameFull">
              {this.state.data.restaurantLink ? (
                <a
                  href={this.state.data.restaurantLink}
                  id="restName"
                  className="restLink"
                >
                  {" "}
                  {this.state.data.restaurantName}
                </a>
              ) : (
                <div id="restName"> {this.state.data.restaurantName} </div>
              )}
            </div>
          </header>

          <div id="cityNameFull">{this.state.data.city}</div>
          <div id="descriptionFull">
            {" "}
            <br />
            {this.state.data.description}
          </div>
          <div id="tagsFull">
            {" "}
            {this.state.data.tags.map(t => (
              <li id="hashTag" key={t.replace(/\s/g, "")}>
                #{t.replace(/\s/g, "")}
              </li>
            ))}{" "}
          </div>
          <div id="authorFull">
            Picture taken by: {this.state.data.author.userName}
          </div>
        </div>
      </div>
    );
  }
}

export default Photo;
