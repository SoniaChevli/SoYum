import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/soYumHeader.css";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="navBar">
        <NavLink to="main" className="navLink">
          Home
        </NavLink>
        <NavLink to="login" className="navLink">
          Login{" "}
        </NavLink>
        <NavLink to="newUser" className="navLink">
          Create Account{" "}
        </NavLink>
      </div>
    );
  }
}

export default NavBar;
