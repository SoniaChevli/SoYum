import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/soYumHeader.css";
import dot from "../icons/circle.png";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="navBar">
        <NavLink to="main" className="navLink">
          Home
        </NavLink>

        <NavLink to="newImage" className="navLink">
          Add Image
        </NavLink>
        <NavLink to="favorites" className="navLink">
          Favorites
        </NavLink>
        <NavLink to="profile" className="navLink">
          Profile
        </NavLink>
      </div>
    );
  }
}

export default NavBar;
