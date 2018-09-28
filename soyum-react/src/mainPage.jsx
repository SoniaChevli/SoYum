import React, { Component } from "react";
import axios from "axios";
import "./styles/mainPage.css";

const apiEndPoint = "http://localhost:3000/api/photos";

class MainPage extends Component {
  state = {
    data: [],
    tmp: "hi"
  };

  componentWillMount() {
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
  redirectToTarget = id => {
    this.props.history.push("/" + id);
  };

  handleImages = d => {
    return (
      <img
        name="mainPagePhotos"
        src={d.photo}
        id={d._id}
        author={d.author._id}
        alt=""
        onClick={() => this.redirectToTarget(d._id)}
      />
    );
  };
  render() {
    console.log("DATA", this.state.data);

    return (
      <div className="mainPage">
        {" "}
        <div id="searchBar">
          <input type="text" placeholder="Search for a city" />
          <button id="searchButton">Search </button>
        </div>
        <div className="allImages">
          {this.state.data.map(d => this.handleImages(d))}
        </div>
      </div>
    );
  }
}

export default MainPage;
