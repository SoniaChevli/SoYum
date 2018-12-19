import React, { Component } from "react";
import Input from "../common/input";
import ImageUpload from "../common/imageUpload";
import MessageBox from "../common/messageBox";
import TextArea from "../common/textArea";
import axios from "axios";
import { API_ROOT } from "../../api-config";
import "../../styles/form.css";
import "../../styles/newUser.css";

const apiEndPointNewUser = API_ROOT + "users";

class NewUser extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    profilePhoto: undefined,
    errorMessageBox: {
      displayCreateAccountError: false,
      errorCreateAccount:
        "There was an error creating an account. Please try again later...",
      displayImageSizeError: false,
      errorImageSize: "Image must be under 14mb"
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const obj = this.state;
    const response = await axios.post(apiEndPointNewUser, obj).catch(() => {
      let errorMessageBox = { ...this.state.errorMessageBox };
      errorMessageBox["displayCreateAccountError"] = true;
      this.setState({ errorMessageBox });
    });
    if (response) {
      this.props.history.push("/login");
    }
  };

  handleChange = e => {
    const attr = e.target.name;
    this.setState({ [attr]: e.target.value });
  };

  fileSelectorHandler = async e => {
    let file = e.target.files[0];
    if (file.size >= 14000000) {
      let errorMessageBox = { ...this.state.errorMessageBox };
      errorMessageBox["displayImageSizeError"] = true;
      return this.setState({ errorMessageBox });
    }

    var reader = new FileReader();
    reader.onload = upload => {
      this.setState({ profilePhoto: upload.target.result });
    };
    reader.readAsDataURL(file);
  };

  closeMessageBox = () => {
    const errorMessageBox = { ...this.state.errorMessageBox };
    errorMessageBox["displayCreateAccountError"] = false;
    errorMessageBox["displayImageSizeError"] = false;
    this.setState({ errorMessageBox });
  };

  render() {
    return (
      <div className="newUser">
        <h1>Create Account </h1>
        <form onSubmit={this.handleSubmit}>
          <ImageUpload
            fileSelectorHandler={this.fileSelectorHandler}
            imagePreview={this.state.profilePhoto}
          />
          <Input
            label="Username:"
            type="text"
            name="userName"
            handleChange={this.handleChange}
          />
          <Input
            label="Email:"
            type="email"
            name="email"
            handleChange={this.handleChange}
          />
          <Input
            label="Password:"
            type="password"
            name="password"
            handleChange={this.handleChange}
          />
          <TextArea
            textAreaClassName="userBio"
            _id="userBio"
            name="bio"
            handleChange={this.handleChange}
            placeholder="Not Required"
          />
          <button id="submitButton" type="submit">
            Create
          </button>
        </form>
        {this.state.errorMessageBox.displayCreateAccountError ? (
          <MessageBox
            messageBox="loginMessageBox"
            messageClassName="loginError"
            message={this.state.errorMessageBox.errorCreateAccount}
            closeMessageBox={this.closeMessageBox}
            buttonClassName="messageBoxButton"
          />
        ) : null}
        {this.state.errorMessageBox.displayImageSizeError ? (
          <MessageBox
            messageBox="loginMessageBox"
            messageClassName="loginError"
            message={this.state.errorMessageBox.errorImageSize}
            closeMessageBox={this.closeMessageBox}
            buttonClassName="messageBoxButton"
          />
        ) : null}
      </div>
    );
  }
}

export default NewUser;
