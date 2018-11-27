import React, { Component } from "react";
import axios from "axios";
import "../styles/deletePhoto.css";
import { API_ROOT } from "../api-config";
import MessageBox from "./common/messageBox";

let apiEndPoint = API_ROOT + "photos/";
class DeletePhoto extends Component {
  state = {
    showMessageBox: false,
    error: ""
  };

  handleDelete = async () => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };
    let finalEndPoint = apiEndPoint + this.props.photoId;
    await axios
      .delete(finalEndPoint + "hi", config)
      .catch(err => this.setState({ showMessageBox: true, error: { err } }));
    this.props.closeDeletePopUp();
  };

  closeMessageBox = () => {
    this.setState({ showMessageBox: false, error: "" });
    this.props.closeDeletePopUp();
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
          {this.state.showMessageBox ? (
            <MessageBox
              messageBox="loginMessageBox"
              messageClassName="loginError"
              message={this.state.error}
              closeMessageBox={this.closeMessageBox}
              buttonClassName="messageBoxButton"
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default DeletePhoto;
