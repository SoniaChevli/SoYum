import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ImageForm from "./components/addPhoto/imageForm";
import SoYumHeader from "./components/soYumHeader";
import MainPage from "./components/mainPhotoPage/mainPage";
import Favorites from "./components/favoritePhoto/favorites";
import Profile from "./components/profile/profile";
import LoginForm from "./components/userLogin/loginForm";
import NewUser from "./components/userLogin/newUser";
import Photo from "./components/photoCard/photoCard";

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
          <Redirect exact from="/photos" to="/main" />
          <Route path="/:id" component={Photo} />
          <Redirect exact from="/" to="/main" />
        </Switch>
      </div>
    );
  }
}

export default App;
