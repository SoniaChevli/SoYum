import React, { Component } from "react";
import NavBar from "./components/navBar";
import UserNavBar from "./components/usersNavBar";
import "./styles/soYumHeader.css";

let signedIn = localStorage.getItem("jwtToken");

class SoYumHeader extends Component {
  render() {
    return (
      <div id="soYumMain">
        <h1 className="soYumName">SoYum</h1>
        <br />
        {signedIn ? <UserNavBar /> : <NavBar />}
      </div>
    );
  }
}

export default SoYumHeader;
