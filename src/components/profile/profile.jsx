import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../../styles/profile.css";
import UserInformation from "./userInformation";
import ProfileImages from "./profileImages";
import { API_ROOT } from "../../api-config";
import DeletePhoto from "../deletePhoto/deletePhoto";
const apiEndPointUser = API_ROOT + "users/me";
let apiEndPointUserPhotos = API_ROOT + "photos/user/";

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

  componentWillMount() {
    if (!localStorage.getItem("jwtToken")) {
      return <Redirect to="/" />;
    }
  }

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
      let apiEndPointUserId = apiEndPointUserPhotos + userResponse.data._id;
      const imageResponse = await axios.get(apiEndPointUserId).catch(err => {
        console.log("ERR", err.response);
      });
      if (imageResponse) {
        await this.setState({
          data: userResponse.data,
          usersPhotos: imageResponse.data
        });
      }
    }
  }

  handleDeleteClick = photo => {
    const displayDeletePopUp = { ...this.state.displayDeletePopUp };
    displayDeletePopUp["display"] = true;
    displayDeletePopUp["photoId"] = photo._id;
    displayDeletePopUp["photoUrl"] = photo.photo;
    this.setState({ displayDeletePopUp });
  };

  closeDeletePopUp = () => {
    const displayDeletePopUp = { ...this.state.displayDeletePopUp };
    displayDeletePopUp["display"] = false;
    displayDeletePopUp["photoId"] = "";
    displayDeletePopUp["photoUrl"] = "";
    this.setState({ displayDeletePopUp });
  };

  removePhoto = () => {
    let usersPhotos = [...this.state.usersPhotos];
    let deletedPhoto = this.state.displayDeletePopUp.photoId;
    usersPhotos = usersPhotos.filter(photo => photo._id !== deletedPhoto);
    this.setState({ usersPhotos });
  };

  render() {
    return (
      <div className="profilePage">
        <UserInformation
          profilePhoto={this.state.data.profilePhoto}
          userName={this.state.data.userName}
          userBio={this.state.data.bio}
        />
        <ProfileImages
          photos={this.state.usersPhotos}
          handleDeleteClick={this.handleDeleteClick}
        />
        {this.state.displayDeletePopUp.display ? (
          <DeletePhoto
            photoId={this.state.displayDeletePopUp.photoId}
            photoUrl={this.state.displayDeletePopUp.photoUrl}
            closeDeletePopUp={this.closeDeletePopUp}
            removePhoto={this.removePhoto}
          />
        ) : null}
      </div>
    );
  }
}

export default Profile;
