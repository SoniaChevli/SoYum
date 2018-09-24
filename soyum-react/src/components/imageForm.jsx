import React, { Component } from "react";
import Input from "../common/input";
import "../styles/imageForm.css";
import uploadSymbol from "../icons/upload-symbol.png";
class ImageForm extends Component {
  render() {
    return (
      <div className="newImage">
        <h1>New Image</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Restaurant"
            type="text"
            name="restaurant"
            _id="restaurantName"
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

          <br />
        </form>
      </div>
    );
  }
}

export default ImageForm;
