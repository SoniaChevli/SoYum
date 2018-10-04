import React, { Component } from "react";
import Input from "./common/input";
import ImageUpload from "./common/imageUpload";
import axios from "axios";
import "../styles/form.css";
import { API_ROOT } from "../api-config";
//const apiEndPointNewUser = "http://localhost:3000/api/users";

const apiEndPointNewUser = API_ROOT + "users";
const cloudinaryURL = "https://api.cloudinary.com/v1_1/dszdk19ok/upload";
let CLOUDINARY_UPLOAD_PRESET = "dtjzjz65";

class NewUser extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    profilePhoto: undefined
  };

  handleSubmit = async e => {
    e.preventDefault();

    console.log("SUBMITTED", this.state);
    const obj = this.state;
    const response = await axios.post(apiEndPointNewUser, obj).catch(error => {
      console.log("ERROR", error.response);
      alert(error.response.data);
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
    console.log("e", e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    let response = await axios({
      url: cloudinaryURL,
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: formData
    }).catch(function(err) {
      console.log("ERR", err);
    });
    try {
      console.log("RESPONSE", response);
      await this.setState({ profilePhoto: response.data.secure_url });
    } catch (error) {
      console.log(error);
    }
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
          <label className="userBio">
            {" "}
            Bio:
            <br />
            <textarea
              id="userBio"
              name="bio"
              onChange={this.handleChange}
              placeholder="Not Required"
            />
          </label>

          <button id="submitButton" type="submit">
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default NewUser;
