import React, { Component } from "react";
import axios from "axios";
import DropdownMenu from "./components/common/dropDownMenu";
import SelectedFilters from "./components/selectedFilter";
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
    favoritesArray: []
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
  redirectToTarget = id => {
    this.props.history.push("/" + id);
  };

  handleImages = d => {
    let photos = this.state.data;
    if (this.state.filtered.length > 0) {
      photos = this.state.filtered;
    }

    return photos.map(d => (
      <img
        name="mainPagePhotos"
        src={d.photo}
        id={d._id}
        author={d.author._id}
        alt=""
        onClick={() => this.redirectToTarget(d._id)}
      />
    ));
  };

  handleToggledTags = async (e, d) => {
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

    console.log("response HERE", response);
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
        <div className="allImages">{this.handleImages()}</div>
      </div>
    );
  }
}

export default MainPage;
