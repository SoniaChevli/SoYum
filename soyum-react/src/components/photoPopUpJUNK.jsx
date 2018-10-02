import React, { Component } from "react";
import "../styles/photoPopUp.css";
import Photo from "./photoPage";

class PhotoPopUp extends Component {
  state = {};
  render() {
    console.log(this.props.photoId);
    return (
      <div id="popUpBox">
        {" "}
        <Photo />
      </div>
    );
  }
}

export default PhotoPopUp;
