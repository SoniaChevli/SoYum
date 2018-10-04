import React, { Component } from "react";
import AddFavorite from "./addToFavorite";
import "../styles/photoPage.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_ROOT } from "../api-config";
// let apiEndPoint = "http://localhost:3000/api/photos/";
let apiEndPoint = API_ROOT + "photos/";
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
    }
  };
  async componentDidMount() {
    let photoApiEndPoint = apiEndPoint + this.props.location.pathname;

    await axios
      .get(photoApiEndPoint)
      .then(res => {
        console.log("RES", res.data);
        const data = res.data;
        this.setState({ data });
        console.log("DATA", this.state.data);
      })
      .catch(err => {
        console.log("ERR", err);
      });
    try {
      let token = localStorage.getItem("jwtToken");
      const loggedInUserId = jwt_decode(token)["_id"];
      console.log("loggedInUserId", loggedInUserId);
      let favoritedPhoto = false;
      console.log(
        "if statement to make it true..",
        this.state.data.favorites.includes(loggedInUserId)
      );
      console.log("favorites array", this.state.data.favorites);
      if (this.state.data.favorites.includes(loggedInUserId))
        favoritedPhoto = true;

      await this.setState({
        loggedInUser: { id: loggedInUserId, favoritedPhoto }
      });
      console.log("here", this.state.loggedInUser);
    } catch (err) {
      console.log("err", err);
    }
  }

  handleTags = () => {
    const tags = this.state.data.tags;
    if (tags.length !== 0) {
      console.log("tags", tags);
      const final = tags.map(t => (
        <div class={t.replace(/\s/g, "")} id="hashTags">
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

  render() {
    return (
      <div className="photoPage">
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
              <li id="hashTag">#{t.replace(/\s/g, "")}</li>
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
