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

  handleDelete = () => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };
    const photoID = this.props.photoId;
    const finalEndPoint = apiEndPoint + photoID;
    axios
      .delete(finalEndPoint, config)
      .then(() => {
        this.props.removePhoto();
        this.props.closeDeletePopUp("true");
      })
      .catch(err => this.setState({ showMessageBox: true, error: { err } }));
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
