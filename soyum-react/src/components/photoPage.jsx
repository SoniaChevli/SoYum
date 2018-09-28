import React, { Component } from "react";
import "../styles/photoPage.css";
import axios from "axios";

class Photo extends Component {
  state = {
    data: {
      restaurantName: "None",
      restaurantLink: "None",
      author: "None",
      city: "None",
      description: "None",
      tags: "None"
    }
  };
  componentWillMount() {
    const apiEndPoint =
      "http://localhost:3000/api/photos" + this.props.location.pathname;

    axios
      .get(apiEndPoint)
      .then(res => {
        console.log("RES", res.data);
        const data = res.data;
        this.setState({ data });
        console.log("DATA", this.state.data);
      })
      .catch(err => {
        console.log("ERR", err);
      });
  }

  render() {
    console.log;
    return (
      <div className="photoPage">
        <img id="photoPageImage" src={this.state.data.photo} alt="" />
        <div className="photoInformation">
          <ul>
            <li> Restaurant Name: {this.state.data.restaurantName}</li>
            <li> Restaurant Link: {this.state.data.restaurantLink} </li>
            <li> City: {this.state.data.city}</li>
            <li> Description: {this.state.data.description}</li>

            <li> Tags: {this.state.data.tags}</li>
            <li> Author: {this.state.data.author.name}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Photo;
