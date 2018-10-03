import React, { Component } from "react";
import axios from "axios";
import "../styles/deletePhoto.css";

let apiEndPoint = "https://soyumapi.herokuapp.com/api/photos/";
//https://soyum.herokuapp.com/api/photos/
class DeletePhoto extends Component {
  state = {};

  handleDelete = async () => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };
    console.log("make delete happen");
    apiEndPoint += this.props.photoId;
    console.log("apiEndPoint", apiEndPoint);
    let response = await axios
      .delete(apiEndPoint, config)
      .catch(err => console.log("ERROR", err));
    if (response) {
      console.log("Photo Deletion Successful ");
    } else {
      console.log("Photo Failed to delete");
    }
    this.props.closeDeletePopUp();
    window.location.reload(true);
  };

  handleExitPopUp = () => {
    this.console.log("go back to profile page");
  };

  render() {
    return (
      <div className="DeletePopUp">
        <div className="deleteQuestion">
          {" "}
          Are you sure you want to delete this photo?{" "}
        </div>
        <img className="deletePhoto" src={this.props.photoUrl} alt="" />
        <div className="answerButtons">
          <button className="yesButton" onClick={this.handleDelete}>
            {" "}
            Yes{" "}
          </button>{" "}
          <button className="noButton" onClick={this.props.closeDeletePopUp}>
            {" "}
            No{" "}
          </button>{" "}
        </div>
      </div>
    );
  }
}

export default DeletePhoto;
