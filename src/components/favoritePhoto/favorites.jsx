import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import DisplayPhotos from "../common/displayPhotos";
import "../../styles/favoritesPage.css";
import { API_ROOT } from "../../api-config";

let apiEndPoint = API_ROOT + "photos/favorites/user/";
class Favorites extends Component {
  state = {
    data: [],
    currentUserId: null
  };

  async componentDidMount() {
    if (!localStorage.getItem("jwtToken")) {
      return this.props.history.push("/main");
    }
    let token = localStorage.getItem("jwtToken");
    const currentUserId = jwt_decode(token)["_id"];
    let favoritesApiEndPoint = apiEndPoint + currentUserId;
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };

    axios
      .get(favoritesApiEndPoint, config)
      .then(res => {
        const data = res.data;

        this.setState({ data, currentUserId });
      })
      .catch(err => {
        console.log("ERR", err);
      });
  }

  render() {
    return (
      <div className="favoritesPage">
        <div className="favoritesHeader">
          <h1> Favorites</h1>
        </div>
        <DisplayPhotos photos={this.state.data} />
      </div>
    );
  }
}
export default Favorites;
