import React, { Component } from "react";
import axios from "axios";
import DropdownMenu from "../common/dropDownMenu";
import SelectedFilters from "../mainPhotoPage/selectedFilter";
import SearchBar from "./searchBar";
import DisplayPhotos from "../common/displayPhotos";
import { restrictionTags, countryTags } from "../../data/foodTags";
import { API_ROOT } from "../../api-config";
import "../../styles/dropDown.css";
import "../../styles/mainPage.css";

const apiEndPoint = API_ROOT + "photos";

class MainPage extends Component {
  state = {
    data: [],
    toggledTags: [],
    citySearch: "",
    filtered: [],
    favoritesArray: [],
    noPhotos: false
  };

  componentDidMount() {
    axios
      .get(apiEndPoint)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
      .catch(err => {
        console.log("ERR", err);
      });
  }

  handleToggledTags = (e, d) => {
    const toggledTags = [...this.state.toggledTags];
    if (!toggledTags.includes(d)) {
      toggledTags.push(d);
    } else {
      const index = toggledTags.indexOf(d);
      toggledTags.splice(index, 1);
    }
    this.setState({ toggledTags });
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
    let noPhotos;
    if (data.length === 0) noPhotos = true;
    else noPhotos = false;

    this.setState({ data, noPhotos });
  };

  handleChange = e => {
    this.setState({ citySearch: e.target.value });
  };

  render() {
    return (
      <div className="mainPage">
        {" "}
        <form onSubmit={this.handleSubmit}>
          <label id="filterBar">
            <SearchBar handleChange={this.handleChange} />
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
            handleAllClick={() =>
              this.setState({ toggledTags: [], citySearch: "" })
            }
          />
        </form>
        {this.state.noPhotos ? (
          <div className="noPhotosMessage">
            {" "}
            There are no photos with this city/filter combination. Try another
            city (ex: Boston) and/or another filter (ex: gluten free){" "}
          </div>
        ) : (
          <DisplayPhotos
            photos={this.state.data}
            filtered={this.state.filtered}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
