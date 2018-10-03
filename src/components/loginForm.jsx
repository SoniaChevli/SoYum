import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Input from "./common/input";
import MessageBox from "./common/messageBox";
import axios from "axios";

import "../styles/appScope.css";
import "../styles/form.css";
//import "../styles/loginForm.css";

//const apiEndPoint = "http://localhost:3000/api/auth";
const apiEndPoint = "https://soyumapi.herokuapp.com/api/auth";

class LoginForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    showMessageBox: false,
    error: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    const obj = this.state.data;

    const response = await axios.post(apiEndPoint, obj).catch(error => {
      console.log("ERROR", error.response);
      // console.log(error.response.data);
      try {
        console.log(error.response.data);
        this.setState({ error: error.response.data, showMessageBox: true });
      } catch (err) {
        console.log("here");
        <Redirect to="/500error" />;
      }
    });
    if (response) {
      console.log("response");
      await localStorage.setItem("jwtToken", response.data);
      window.location.reload(true);
      await this.props.history.push("/");
    }
  };

  handleChange = e => {
    const attr = e.target.name;
    const data = { ...this.state.data };
    data[attr] = e.target.value;
    this.setState({ data });
    console.log("HERE", this.state);
  };

  closeMessageBox = () => {
    this.setState({ showMessageBox: false, error: "" });
  };

  render() {
    return (
      <div className="loginForm">
        <h1>Login </h1>
        <form onSubmit={this.handleSubmit}>
          {this.state.showMessageBox ? (
            <MessageBox
              messageBox="loginMessageBox"
              messageClassName="loginError"
              message={this.state.error}
              closeMessageBox={this.closeMessageBox}
              buttonClassName="messageBoxButton"
            />
          ) : null}
          <Input
            label="Email:"
            type="email"
            name="email"
            handleChange={this.handleChange}
          />
          <Input
            label="Password:"
            type="password"
            name="password"
            handleChange={this.handleChange}
          />
          <button id="submitButton" type="submit">
            Post
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
