import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import "../styles/soYumHeader.css";

class UserNavBar extends Component {
  state = {};
  handleLogout = () => {
    localStorage.removeItem("jwtToken");

    <Redirect to="/main" />;
    window.location.reload(true);
    this.props.history.push("/main");

    console.log(this.props);
  };
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
        <button onClick={this.handleLogout} className="logoutButton">
          {" "}
          Logout{" "}
        </button>
      </div>
    );
  }
}

export default UserNavBar;
