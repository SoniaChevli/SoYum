import React, { Component } from "react";
import Input from "../common/input";
import MessageBox from "../common/messageBox";
import axios from "axios";
import { API_ROOT } from "../../api-config";
import "../../styles/appScope.css";
import "../../styles/form.css";
import "../../styles/loginForm.css";

const apiEndPoint = API_ROOT + "auth";

class LoginForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    showMessageBox: false,
    error: "",
    loggedIn: false
  };

  handleSubmit = async e => {
    e.preventDefault();

    const obj = this.state.data;

    const response = await axios.post(apiEndPoint, obj).catch(error => {
      try {
        this.setState({ error: error.response.data, showMessageBox: true });
      } catch (err) {
        console.log(err);
      }
    });
    if (response) {
      await localStorage.setItem("jwtToken", response.data);
      this.setState({ loggedIn: true });
      await this.props.history.push("/");
    }
  };

  handleChange = e => {
    const attr = e.target.name;
    const data = { ...this.state.data };
    data[attr] = e.target.value;
    this.setState({ data });
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
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
