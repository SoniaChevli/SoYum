import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { API_ROOT } from "../api-config";
import DeletePhoto from "./deletePhoto";
import NoProfilePicture from "../icons/no_profile.png";
import DeleteButton from "../icons/delete.png";
import MessageBox from "./common/messageBox";
import "../styles/profile.css";

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
    displayDeletePopUp: { display: false, photoId: "", photoUrl: "" },
    displayErrorMessage: { display: false, error: "" }
  };

  componentDidMount() {
    if (!localStorage.getItem("jwtToken")) {
      return this.props.history.push("/main");
    }
  }
  handleErrorMessageClose = async () => {
    let displayErrorMessage = { ...this.state.displayErrorMessage };
    displayErrorMessage["display"] = false;
    displayErrorMessage["error"] = "";
    await this.setState({ displayErrorMessage });
    return this.props.history.push("/");
  };

  retrievePhotos = async () => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };
    const userResponse = await axios.get(apiEndPointUser, config).catch(err => {
      const displayErrorMessage = { ...this.state.displayErrorMessage };
      displayErrorMessage["display"] = true;
      displayErrorMessage["error"] =
        "There was an error loading your images. Try again later!";
      this.setState({ displayErrorMessage });
    });

    if (userResponse) {
      let apiEndPointUserId = apiEndPointUserPhotos + userResponse.data._id;
      const imageResponse = await axios.get(apiEndPointUserId).catch(err => {
        const displayErrorMessage = { ...this.state.displayErrorMessage };
        displayErrorMessage["display"] = true;
        displayErrorMessage["error"] =
          "There was an error loading your images. Try again later!";
        this.setState({ displayErrorMessage });
      });
      if (imageResponse) {
        this.setState({
          data: userResponse.data,
          usersPhotos: imageResponse.data
        });
      }
    }
  };
  handleDeleteClick = async photo => {
    console.log("DELETE", photo.photo);
    const displayDeletePopUp = { ...this.state.displayDeletePopUp };
    displayDeletePopUp["display"] = true;
    displayDeletePopUp["photoId"] = photo._id;
    displayDeletePopUp["photoUrl"] = photo.photo;
    await this.setState({ displayDeletePopUp });
    console.log("display delete popUP", this.state.displayDeletePopUp);
  };
  closeDeletePopUp = async () => {
    const displayDeletePopUp = { ...this.state.displayDeletePopUp };
    displayDeletePopUp["display"] = false;
    displayDeletePopUp["photoId"] = "";
    displayDeletePopUp["photoUrl"] = "";
    this.setState({ displayDeletePopUp });
    console.log("display delete popUP", this.state.displayDeletePopUp);
  };
  handleImages = () => {
    this.retrievePhotos();
    let photos = this.state.usersPhotos;
    return photos.map(d => (
      <div className="imagesDelete" key={d._id}>
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
        {this.state.displayErrorMessage.display ? (
          <MessageBox
            messageBox="profileError"
            messageClassName="profileErrorMessage"
            closeMessageBox={this.handleErrorMessageClose}
            buttonClassName="closeProfileError"
            message={this.state.displayErrorMessage.error}
          />
        ) : null}
      </div>
    );
  }
}

export default Profile;
