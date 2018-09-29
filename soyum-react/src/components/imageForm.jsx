import React, { Component } from "react";
import Input from "./common/input";
import { Redirect } from "react-router-dom";
import DropdownMenu from "./common/dropDownMenu";
import "../styles/imageForm.css";
import "../styles/appScope.css";
import "../styles/form.css";
import { restrictionTags, countryTags } from "../data/foodTags";
import uploadSymbol from "../icons/upload-symbol.png";
import axios from "axios";

const cloudinaryURL = "https://api.cloudinary.com/v1_1/dszdk19ok/upload";
let CLOUDINARY_UPLOAD_PRESET = "dtjzjz65";
const apiEndPoint = "http://localhost:3000/api/photos";

class ImageForm extends Component {
  state = {
    selectedFile: null,
    imagePreview: "",
    toggledTags: [],
    data: {
      tags: {}
    }
  };

  handleChange = async e => {
    e.preventDefault();
    const data = { ...this.state.data };
    const attr = e.target.name;
    data[attr] = e.target.value;

    await this.setState({ data });
    console.log("DATA", this.state.data);
  };

  handleSubmit = async e => {
    e.preventDefault();
    const obj = this.state.data;
    const jwtToken = localStorage.getItem("jwtToken");
    console.log("JWTTOKEN", jwtToken);
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };
    console.log("CONFIG", config);
    console.log("SUBMITTED", this.state);
    const response = await axios.post(apiEndPoint, obj, config).catch(error => {
      console.log("ERROR", error.response);
      // console.log(error.response.data);
      try {
        alert(error.response.data);
      } catch (err) {
        console.log("here");
        <Redirect to="/500error" />;
      }
    });

    console.log("RESPONSE", response);
  };

  fileSelectorHandler = async e => {
    await this.setState({ selectedFile: e.target.files[0] });
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
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
      await this.setState({ imagePreview: response.data.secure_url });

      const data = { ...this.state.data };
      data["photo"] = response.data.secure_url;
      this.setState({ data });
    } catch (error) {
      console.log(error);
    }
  };

  handleToggledTags = async (e, d) => {
    console.log("Handle Toggled Tags", e);

    console.log("D", d);
    const selectedElements = [...this.state.data.tags];
    if (!selectedElements.includes(d)) {
      selectedElements.push(d);
    } else {
      const index = selectedElements.indexOf(d);
      console.log(index);
      selectedElements.splice(index, 1);
    }
    console.log("SELECTED", selectedElements);
    const data = { ...this.state.data };
    data["tags"] = selectedElements;
    await this.setState({ data });

    console.log("DATA", this.state.data.tags);
  };

  displaySelected = () => {};

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
          <label id="custom-file-upload">
            {" "}
            Upload Image
            <img src={uploadSymbol} alt="" id="uploadSymbol" />
            <br />
            <input
              type="file"
              name="imageUpload"
              onChange={this.fileSelectorHandler}
            />
            {this.state.imagePreview.length > 0 ? (
              <img src={this.state.imagePreview} id="imagePreview" />
            ) : (
              <div />
            )}
          </label>

          <Input
            label="Restaurant Name:"
            type="text"
            name="restaurantName"
            _id="restaurantName"
            placeholder="In-N-Out, Miss Saigon, Papalote..."
            handleChange={this.handleChange}
          />
          <Input
            label="Link:"
            type="text"
            name="restaurantLink"
            _id="restaurantName"
            placeholder="Not Required"
            handleChange={this.handleChange}
          />
          <Input
            label="City:"
            type="text"
            name="city"
            _id="city"
            placeholder="Buffalo, San Francisco, New York..."
            handleChange={this.handleChange}
          />

          <br />
          <label id="imageDescription">
            {" "}
            Description
            <br />
            <textarea name="description" onChange={this.handleChange} />
          </label>
          <br />
          <div className="tagBox">
            <div className="addTags"> Add Tags: </div>
            <DropdownMenu
              buttonId="dropDown"
              menuId="menu"
              menuItems={restrictionTags}
              label="Food Restrictions"
              handleSelect={this.handleToggledTags}
            />
            <DropdownMenu
              buttonId="dropDown"
              menuId="menu"
              menuItems={countryTags}
              label="Food Type"
              handleSelect={this.handleToggledTags}
            />
          </div>
          <div id="added_tags">
            <div id="selectedHeader">Selected Tags: </div>
            {this.state.toggledTags.map(t => (
              <li>{t}</li>
            ))}{" "}
          </div>
          <button id="submitButton" type="submit">
            Post
          </button>
        </form>
      </div>
    );
  }
}

export default ImageForm;
