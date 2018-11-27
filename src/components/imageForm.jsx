import React, { Component } from "react";
import Input from "./common/input";
import { Redirect } from "react-router-dom";
import DropdownMenu from "./common/dropDownMenu";
import ImageUpload from "./common/imageUpload";
import MessageBox from "./common/messageBox";
import ReactLoading from "react-loading";
import { API_ROOT } from "../api-config";
import "../styles/imageForm.css";
import "../styles/appScope.css";
import "../styles/form.css";
import { restrictionTags, countryTags } from "../data/foodTags";
import axios from "axios";

const apiEndPoint = API_ROOT + "photos";

class ImageForm extends Component {
  state = {
    selectedFile: null,
    imagePreview: "",
    toggledTags: [],
    data: {
      tags: [],
      photo: null
    },
    showMessageBox: false,
    error: "",
    showLoadingSymbol: false
  };

  handleChange = async e => {
    e.preventDefault();
    const data = { ...this.state.data };
    const attr = e.target.name;
    data[attr] = e.target.value;

    await this.setState({ data });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const obj = this.state.data;
    console.log("OBJ", obj);

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };

    const response = await axios.post(apiEndPoint, obj, config).catch(error => {
      try {
        console.log(error.response.data);
        this.setState({ error: error.response.data, showMessageBox: true });
      } catch (err) {
        console.log("here");
      }
    });

    if (response) {
      this.props.history.push("/main");
    }
  };

  handleToggledTags = async (e, d) => {
    const selectedElements = [...this.state.data.tags];
    if (!selectedElements.includes(d)) {
      selectedElements.push(d);
    } else {
      const index = selectedElements.indexOf(d);
      console.log(index);
      selectedElements.splice(index, 1);
    }
    const data = { ...this.state.data };
    data["tags"] = selectedElements;
    await this.setState({ data, toggledTags: selectedElements });
  };

  fileSelectorHandler = async e => {
    let file = e.target.files[0];
    if (file.size >= 14000000)
      return this.setState({ error: "image must be under 14mb" });
    var reader = new FileReader();
    reader.onload = upload => {
      let data = { ...this.state.data };
      data["photo"] = upload.target.result;
      this.setState({ data });
    };
    reader.readAsDataURL(file);
  };

  closeMessageBox = () => {
    this.setState({ showMessageBox: false, error: "" });
  };

  render() {
    if (!localStorage.getItem("jwtToken")) {
      return <Redirect to="/" />;
    }

    return (
      <div className="newImage">
        <h1>New Image</h1>
        <form onSubmit={this.handleSubmit}>
          <ImageUpload
            fileSelectorHandler={this.fileSelectorHandler}
            imagePreview={this.state.data.photo}
          />
          {this.state.showLoadingSymbol ? (
            <ReactLoading
              type="spinningBubbles"
              color="blue"
              height={30}
              width={30}
            />
          ) : null}
          {this.state.showMessageBox ? (
            <MessageBox
              messageBox="imageFormMessageBox"
              messageClassName="imageFormError"
              message={this.state.error}
              closeMessageBox={this.closeMessageBox}
              buttonClassName="messageBoxButton"
            />
          ) : null}
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
              selectedElements={this.state.toggledTags}
            />
            <DropdownMenu
              buttonId="dropDown"
              menuId="menu"
              menuItems={countryTags}
              label="Food Type"
              handleSelect={this.handleToggledTags}
              selectedElements={this.state.toggledTags}
            />
          </div>
          <div id="added_tags">
            <div id="selectedHeader">Selected Tags:</div>
            {this.state.toggledTags.map(t => (
              <li id="imageFormTagList">{t}</li>
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
