import React, { Component } from "react";
import "../styles/mainPage.css";

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <label id="searchBar">
        {" "}
        <input type="text" placeholder="Search for a city" />
      </label>
    );
  }
}

export default SearchBar;
