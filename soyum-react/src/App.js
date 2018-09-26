import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ImageForm from "./components/imageForm";
import SoYumHeader from "./soYumHeader";
import MainPage from "./mainPage";
import Favorites from "./components/favorites";
import Profile from "./components/profile";
import LoginForm from "./components/loginForm";
import NewUser from "./components/newUser";
import ServerError from "./components/serverError";

class App extends Component {
  render() {
    return (
      <div>
        <SoYumHeader />
        <Switch>
          <Route path="/newImage" component={ImageForm} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={LoginForm} />
          <Route path="/newUser" component={NewUser} />
          <Route path="/main" component={MainPage} />
          <Route path="/500error" component={ServerError} />

          <Redirect exact from="/" to="/main" />
        </Switch>
      </div>
    );
  }
}

export default App;
