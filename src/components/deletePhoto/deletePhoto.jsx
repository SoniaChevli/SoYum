import React, { Component } from "react";
import axios from "axios";
import "../../styles/deletePhoto.css";
import { API_ROOT } from "../../api-config";
import MessageBox from "../common/messageBox";
import DeletePopUp from "./deletePopUp";

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
    let photoID = this.props.photoId;
    let finalEndPoint = apiEndPoint + photoID;
    await axios
      .delete(finalEndPoint, config)
      .catch(err => this.setState({ showMessageBox: true, error: { err } }));
    this.props.removePhoto();
    this.props.closeDeletePopUp("true");
  };

  closeMessageBox = () => {
    this.setState({ showMessageBox: false, error: "" });
  };

  render() {
    return (
      <div className="DeletePopUp">
        <DeletePopUp
          photoUrl={this.props.photoUrl}
          handleDelete={this.handleDelete}
          closeDeletePopUp={this.props.closeDeletePopUp}
        />

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
    );
  }
}

export default DeletePhoto;
