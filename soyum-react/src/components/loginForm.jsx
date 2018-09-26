import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Input from "./common/input";
import axios from "axios";
import "../styles/appScope.css";
import "../styles/form.css";

const apiEndPoint = "http://localhost:3000/api/auth";

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    console.log("SUBMITTED", this.state);
    const obj = this.state;
    const response = await axios.post(apiEndPoint, obj).catch(error => {
      console.log("ERROR", error.response);
      // console.log(error.response.data);
      try {
        alert(error.response.data);
      } catch (err) {
        console.log("here");
        <Redirect to="/500error" />;
      }
    });
    if (response) {
      console.log("response");
      localStorage.setItem("jwtToken", response.data);
      this.props.history.push("/");
    }
  };

  handleChange = e => {
    const attr = e.target.name;
    this.setState({ [attr]: e.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <div className="loginForm">
        <h1>Login </h1>
        <form onSubmit={this.handleSubmit}>
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
