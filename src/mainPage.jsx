import React, { Component } from "react";
import axios from "axios";
import DropdownMenu from "./components/common/dropDownMenu";
import Input from "./components/common/input";
import SelectedFilters from "./components/selectedFilter";
import MessageBox from "./components/common/messageBox";
import { restrictionTags, countryTags } from "./data/foodTags";
import { API_ROOT } from "./api-config";
import "./styles/dropDown.css";
import "./styles/mainPage.css";

console.log("API ROOT TEST", API_ROOT);
const apiEndPoint = API_ROOT + "photos";

class MainPage extends Component {
  state = {
    data: [],
    toggledTags: [],
    citySearch: "",
    filtered: [],
    favoritesArray: [],
    displayErrorMessage: {
      displayImageError: false,
      imageLoadingerror:
        "There was an error loading the images. Please try again later...",
      displayFilterError: false,
      filterError: "There was an error filtering. Please try again later..."
    }
  };

  componentDidMount() {
    axios
      .get(apiEndPoint)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
      .catch(err => {
        let displayErrorMessage = { ...this.state.displayErrorMessage };
        displayErrorMessage["display"] = true;
        this.setState({ displayErrorMessage });
      });
  }

  handleImages = d => {
    let photos = this.state.data;
    if (this.state.filtered.length > 0) {
      photos = this.state.filtered;
    }

    return photos.map(photo => (
      <div className="squareImage">
        <img
          name="mainPagePhotos"
          src={photo.photo}
          id={photo._id}
          author={photo.author._id}
          alt={photo._id}
          onClick={() => this.redirectToTarget(photo._id)}
          key={photo._id}
        />
      </div>
    ));
  };

  redirectToTarget = id => {
    this.props.history.push("/" + id);
  };

  handleToggledTags = async (e, d) => {
    const selectedElements = [...this.state.toggledTags];
    if (!selectedElements.includes(d)) {
      selectedElements.push(d);
    } else {
      const index = selectedElements.indexOf(d);
      selectedElements.splice(index, 1);
    }
    this.setState({ toggledTags: selectedElements });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await axios
      .get(apiEndPoint, {
        params: {
          tags: this.state.toggledTags,
          city: this.state.citySearch
        }
      })
      .catch(err => {
        console.log("ERR", err);
      });

    const data = response.data;
    this.setState({ data });
  };

  handleChange = e => {
    this.setState({ citySearch: e.target.value });
  };

  closeMessageBox = () => {
    let displayErrorMessage = { ...this.state.displayErrorMessage };
    displayErrorMessage["displayFilterError"] = false;
    this.setState({ displayErrorMessage });
  };

  render() {
    return (
      <div className="mainPage">
        {" "}
        <form onSubmit={this.handleSubmit}>
          <div id="filterBar">
            <div id="searchBar">
              <Input
                label=""
                type="text"
                placeholder="Search for a city..."
                handleChange={this.handleChange}
                _id=""
                name="searchInput"
              />
              <button id="searchButton">Search </button>
            </div>
            <div id="filterChoices">
              <DropdownMenu
                buttonId="mainDropDown"
                menuId="mainMenu"
                menuItems={restrictionTags}
                label="Food Restrictions"
                handleSelect={this.handleToggledTags}
                selectedElements={this.state.toggledTags}
              />
              <DropdownMenu
                buttonId="mainDropDown"
                menuId="mainMenu"
                menuItems={countryTags}
                label="Food Type"
                handleSelect={this.handleToggledTags}
                selectedElements={this.state.toggledTags}
              />
            </div>
            <SelectedFilters
              toggled={this.state.toggledTags}
              handleFilterClick={() => this.setState({ toggledTags: [] })}
              handleAllClick={async () =>
                await this.setState({ toggledTags: [], citySearch: "" })
              }
            />
          </div>
        </form>
        {this.state.displayErrorMessage.displayImageError ? (
          <h3 className="mainImageError">
            {" "}
            {this.state.displayErrorMessage.imageLoadingerror}
          </h3>
        ) : (
          <div className="allImages">{this.handleImages()}</div>
        )}
        {this.state.displayErrorMessage.displayFilterError ? (
          <MessageBox
            messageBox="loginMessageBox"
            messageClassName="loginError"
            message={this.state.displayErrorMessage.filterError}
            closeMessageBox={this.closeMessageBox}
            buttonClassName="messageBoxButton"
          />
        ) : null}
      </div>
    );
  }
}

export default MainPage;
