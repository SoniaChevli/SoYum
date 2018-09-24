import React, { Component } from "react";
import SearchBar from "./components/searchBar";
class MainPage extends Component {
  state = {};
  render() {
    return (
      <div>
        {" "}
        <SearchBar />
        <h1> THE IMAGES WILL GO HERE </h1>
      </div>
    );
  }
}

export default MainPage;
