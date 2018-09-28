import React, { Component } from "react";
import Input from "./common/input";
import axios from "axios";
import "../styles/form.css";

const apiEndPointNewUser = "http://localhost:3000/api/users";

class NewUser extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    console.log("SUBMITTED", this.state);
    const obj = this.state;
    const response = await axios.post(apiEndPointNewUser, obj).catch(error => {
      console.log("ERROR", error.response);
      alert(error.response.data);
    });
    if (response) {
      this.props.history.push("/login");
    }
  };

  handleChange = e => {
    const attr = e.target.name;
    this.setState({ [attr]: e.target.value });
  };

  render() {
    return (
      <div className="newUser">
        <h1>Create Account </h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Name:"
            type="text"
            name="name"
            handleChange={this.handleChange}
          />
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
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default NewUser;
