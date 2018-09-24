import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ImageForm from "./components/imageForm";
import SoYumHeader from "./soYumHeader";
import MainPage from "./mainPage";
import Favorites from "./components/favorites";
import Profile from "./components/profile";

class App extends Component {
  render() {
    return (
      <div>
        <SoYumHeader />
        <Switch>
          <Route path="/newImage" component={ImageForm} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/profile" component={Profile} />

          <Route path="/main" component={MainPage} />
          <Redirect exact from="/" to="/main" />
        </Switch>
      </div>
    );
  }
}

export default App;
