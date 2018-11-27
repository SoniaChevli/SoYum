import React, { Component } from "react";
import NavBar from "./components/navBar";
import "./styles/soYumHeader.css";

class SoYumHeader extends Component {
  render() {
    return (
      <div id="soYumMain">
        <h1 className="soYumName">SoYum</h1>
        <br />
        {<NavBar />}
      </div>
    );
  }
}

export default SoYumHeader;
