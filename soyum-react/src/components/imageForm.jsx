import React, { Component } from "react";
import Input from "./common/input";
import { Redirect } from "react-router-dom";
import "../styles/imageForm.css";
import "../styles/appScope.css";
import "../styles/form.css";
import uploadSymbol from "../icons/upload-symbol.png";
class ImageForm extends Component {
  handleChange = e => {
    e.preventDefault();
    console.log(e);
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log(e);

    // console.log("SUBMITTED", this.state);
    // const obj = this.state;
    // const response = await axios.post(apiEndPoint, obj).catch(error => {
    //   console.log("ERROR", error.response);
    //   // console.log(error.response.data);
    //   alert(error.response.data);
    // });
    // if (response) {
    //   console.log("response");
    //   localStorage.setItem("jwtToken", response.data);
    //   this.props.history.push("/");
    // }
  };
  render() {
    if (!localStorage.getItem("jwtToken")) {
      console.log(localStorage.getItem("jwtToken"));
      return <Redirect to="/" />;
    }
    console.log(localStorage.getItem("jwtToken"));
    return (
      <div className="newImage">
        <h1>New Image</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Restaurant:"
            type="text"
            name="restaurant"
            _id="restaurantName"
            handleChange={this.handleChange}
          />
          <Input
            label="City:"
            type="text"
            name="city"
            _id="city"
            handleChange={this.handleChange}
          />

          <br />
          <label id="imageDescription">
            {" "}
            Description
            <br />
            <textarea name="description" />
          </label>
          <br />
          <label id="custom-file-upload">
            {" "}
            Upload Image
            <img src={uploadSymbol} alt="" />
            <br />
            <input type="file" name="imageUpload" />
          </label>
        </form>
        <button id="submitButton" type="submit">
          Post
        </button>
      </div>
    );
  }
}

export default ImageForm;
