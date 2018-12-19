import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import menubar from "../icons/menu.png";
import "../styles/soYumHeader.css";

class NavBar extends Component {
  state = {
    loggedIn: false,
    dropDown: false,
    redirect: false
  };

  // componentDidMount = () => {
  //   if (localStorage.getItem("jwtToken") && !this.state.loggedIn)
  //     this.setState({ loggedIn: true });
  // };

  checkLoggedIn = () => {
    if (localStorage.getItem("jwtToken") && !this.state.loggedIn)
      this.setState({ loggedIn: true });
  };

  handleLogout = () => {
    let loggedIn = false;
    let redirect = true;
    localStorage.removeItem("jwtToken");
    this.setState({ loggedIn, redirect });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  setRedirect = () => {
    if (!localStorage.getItem("jwtToken") && this.state.loggedIn)
      this.setState({ redirect: true });
  };

  handleDropDownClick = () => {
    const dropDown = !this.state.dropDown;
    this.setState({ dropDown });
  };

  render() {
    return (
      <div className="navBar">
        {this.renderRedirect()}
        {this.setRedirect()}
        {this.checkLoggedIn()}
        <img
          src={menubar}
          alt="menuBar"
          className="responsiveMenuBar"
          onClick={this.handleDropDownClick}
        />
        <div
          className={
            this.state.dropDown ? "dropDownNavBar" : "noDropDownNavBar"
          }
        >
          <NavLink to="main" className="navLink">
            Home
          </NavLink>

          {this.state.loggedIn
            ? [
                <NavLink to="newImage" className="navLink" key="AddImage">
                  Add Image
                </NavLink>,
                <NavLink to="favorites" className="navLink" key="Favorites">
                  Favorites
                </NavLink>,
                <NavLink to="profile" className="navLink" key="Profile">
                  Profile
                </NavLink>,
                <button
                  onClick={this.handleLogout}
                  className="logoutButton"
                  key="logoutButton"
                >
                  {" "}
                  Logout{" "}
                </button>
              ]
            : [
                <NavLink to="login" className="navLink" key="Login">
                  Login{" "}
                </NavLink>,
                <NavLink to="newUser" className="navLink" key="NewUser">
                  Create Account{" "}
                </NavLink>
              ]}
        </div>
      </div>
    );
  }
}

export default NavBar;
