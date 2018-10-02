import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../styles/profile.css";
import NoProfilePicture from "../icons/no_profile.png";
import DeleteButton from "../icons/delete.png";

import DeletePhoto from "./deletePhoto";
const apiEndPointUser = "http://localhost:3000/api/users/me";
let apiEndPointUserPhotos = "http://localhost:3000/api/photos/user/";
class Profile extends Component {
  state = {
    data: {
      _id: "",
      userName: "",
      email: "",
      profilePhoto: "",
      bio: ""
    },
    usersPhotos: [],
    displayDeletePopUp: { display: false, photoId: "", photoUrl: "" }
  };

  async componentDidMount() {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };
    const userResponse = await axios
      .get(apiEndPointUser, config)
      .catch(err => console.log("ERR", err));

    if (userResponse) {
      apiEndPointUserPhotos += userResponse.data._id;
      const imageResponse = await axios
        .get(apiEndPointUserPhotos)
        .catch(err => {
          console.log("ERR", err.response);
        });
      if (imageResponse) {
        await this.setState({
          data: userResponse.data,
          usersPhotos: imageResponse.data
        });
      }
    }
    console.log("PROFILE STATE ON MOUNT", this.state.data);
    console.log("PHOTO RESPONSE", this.state.usersPhotos);
  }

  handleDeleteClick = async photo => {
    console.log("DELETE", photo.photo);
    const displayDeletePopUp = { ...this.state.displayDeletePopUp };
    displayDeletePopUp["display"] = true;
    displayDeletePopUp["photoId"] = photo._id;
    displayDeletePopUp["photoUrl"] = photo.photo;
    await this.setState({ displayDeletePopUp });
    console.log("state after delete", this.state.displayDeletePopUp);
  };

  closeDeletePopUp = async () => {
    const displayDeletePopUp = { ...this.state.displayDeletePopUp };
    displayDeletePopUp["display"] = false;
    displayDeletePopUp["photoId"] = "";
    displayDeletePopUp["photoUrl"] = "";
    await this.setState({ displayDeletePopUp });
  };
  handleImages = () => {
    let photos = this.state.usersPhotos;

    console.log("here", photos);
    return photos.map(d => (
      <div className="imagesDelete">
        <img
          name="profilePagePhotos"
          src={d.photo}
          id={d._id}
          author={d.author._id}
          alt=""
        />
        <img
          src={DeleteButton}
          id="deleteButton"
          alt=""
          onClick={() => this.handleDeleteClick(d)}
        />
      </div>
    ));
  };

  render() {
    if (!localStorage.getItem("jwtToken")) {
      console.log(localStorage.getItem("jwtToken"));
      return <Redirect to="/" />;
    }
    console.log("START OF RENDER", this.state);
    return (
      <div className="profilePage">
        <header className="profileHeader">
          {this.state.data.profilePhoto ? (
            <img
              className="profilePhoto"
              src={this.state.data.profilePhoto}
              alt=""
            />
          ) : (
            <img className="profilePhoto" src={NoProfilePicture} alt="" />
          )}
          <div className="headerUserInfo">
            <div className="headerUserName">{this.state.data.userName} </div>
            <div className="headerBio">{this.state.data.bio} </div>
          </div>
        </header>
        <div className="allImages">{this.handleImages()}</div>

        {this.state.displayDeletePopUp.display ? (
          <DeletePhoto
            photoId={this.state.displayDeletePopUp.photoId}
            photoUrl={this.state.displayDeletePopUp.photoUrl}
            closeDeletePopUp={this.closeDeletePopUp}
          />
        ) : null}
      </div>
    );
  }
}

export default Profile;
