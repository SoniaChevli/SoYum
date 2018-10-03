import React, { Component } from "react";
import axios from "axios";
import DropdownMenu from "./components/common/dropDownMenu";
import SelectedFilters from "./components/selectedFilter";
import PhotoPopUp from "./components/photoPopUp";
import DisplayImages from "./components/displayImagesMain";
import { restrictionTags, countryTags } from "./data/foodTags";
import "./styles/dropDown.css";
import "./styles/mainPage.css";

const apiEndPoint = "http://localhost:3000/api/photos";

class MainPage extends Component {
  state = {
    data: [],
    toggledTags: [],
    citySearch: "",
    filtered: [],
    popUpData: {
      showPopUp: false,
      popUpImageId: null
    }
  };

  componentWillMount() {}
  handleSelectedImage = async id => {
    const popUpData = { ...this.state.popUpData };
    popUpData.showPopUp = true;
    popUpData.popUpImageId = id;
    await this.setState({ popUpData });
    console.log("STATE", this.state.popUpData);
  };

  handleToggledTags = async (e, d) => {
    console.log("D", d);
    const selectedElements = [...this.state.toggledTags];
    if (!selectedElements.includes(d)) {
      selectedElements.push(d);
    } else {
      const index = selectedElements.indexOf(d);
      console.log(index);
      selectedElements.splice(index, 1);
    }

    await this.setState({ toggledTags: selectedElements });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("here", this.state.toggledTags);
    let allData = [...this.state.data];

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
    await this.setState({ data });
  };

  handleChange = async e => {
    await this.setState({ citySearch: e.target.value });
  };

  render() {
    return (
      <div className="mainPage">
        {" "}
        <form onSubmit={this.handleSubmit}>
          <label id="filterBar">
            <div id="searchaBar">
              <input
                id="searchInput"
                type="text"
                placeholder="Search for a city..."
                onChange={this.handleChange}
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
          </label>
          <SelectedFilters
            toggled={this.state.toggledTags}
            handleFilterClick={() => this.setState({ toggledTags: [] })}
            handleAllClick={async () =>
              await this.setState({ toggledTags: [], citySearch: "" })
            }
          />
        </form>
        <DisplayImages
          photos={this.state.data}
          filtered={this.state.filtered}
        />
        {this.state.popUpData.showPopUp ? (
          <PhotoPopUp photoId={this.state.popUpData.popUpImageId} />
        ) : null}
      </div>
    );
  }
}

export default MainPage;
