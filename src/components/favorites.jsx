import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../styles/favoritesPage.css";
import { API_ROOT } from "../api-config";

let apiEndPoint = API_ROOT + "photos/favorites/user/";
class Favorites extends Component {
  state = {
    data: [],
    currentUserId: null
  };

  async componentDidMount() {
    if (!localStorage.getItem("jwtToken")) {
      this.props.history.push("/main");
    }

    let token = localStorage.getItem("jwtToken");
    const currentUserId = jwt_decode(token)["_id"];
    let favoritesApiEndPoint = apiEndPoint + currentUserId;
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };

    await axios
      .get(favoritesApiEndPoint, config)
      .then(res => {
        console.log("RES", res.data);
        const data = res.data;

        this.setState({ data, currentUserId });
        console.log("DATA", this.state.data);
      })
      .catch(err => {
        console.log("ERR", err);
      });
  }
  redirectToTarget = id => {
    this.props.history.push("/" + id);
  };
  handleImages = d => {
    let photos = this.state.data;

    return photos.map(d => (
      <img
        name="mainPagePhotos"
        src={d.photo}
        id={d._id}
        author={d.author._id}
        alt=""
        onClick={() => this.redirectToTarget(d._id)}
      />
    ));
  };
  render() {
    return (
      <div className="favoritesPage">
        <div className="favoritesHeader">
          <h1> Favorites</h1>
        </div>
        <div className="allImages">{this.handleImages()}</div>
      </div>
    );
  }
}
export default Favorites;
