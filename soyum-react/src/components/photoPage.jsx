import React, { Component } from "react";
import "../styles/photoPage.css";
import axios from "axios";

class Photo extends Component {
  state = {
    data: {
      restaurantName: "None",
      restaurantLink: "",
      author: "None",
      city: "None",
      description: "None",
      tags: []
    }
  };
  componentDidMount() {
    const apiEndPoint =
      "http://localhost:3000/api/photos/" + this.props.location.pathname;
    // const apiEndPoint =
    //   "http://localhost:3000/api/photos/5bb118f2762180adf6e9ca60";
    axios
      .get(apiEndPoint)
      .then(res => {
        console.log("RES", res.data);
        const data = res.data;
        this.setState({ data });
        console.log("DATA", this.state.data);
      })
      .catch(err => {
        console.log("ERR", err);
      });
  }

  handleTags = () => {
    const tags = this.state.data.tags;
    if (tags.length !== 0) {
      console.log("tags", tags);
      const final = tags.map(t => (
        <div class={t.replace(/\s/g, "")} id="hashTags">
          #{t.replace(/\s/g, "")}
        </div>
      ));

      return final;
    }
  };

  render() {
    return (
      <div className="photoPage">
        <img id="photoPageImage" src={this.state.data.photo} alt="" />
        <div className="photoInformation">
          <header id="imageHeader">
            <div id="restaurantNameFull">
              {this.state.data.restaurantLink ? (
                <a
                  href={this.state.data.restaurantLink}
                  id="restName"
                  className="restLink"
                >
                  {" "}
                  {this.state.data.restaurantName}
                </a>
              ) : (
                <div id="restName"> {this.state.data.restaurantName} </div>
              )}
            </div>
          </header>

          <div id="cityNameFull">{this.state.data.city}</div>
          <div id="descriptionFull">
            {" "}
            <br />
            {this.state.data.description}
          </div>
          <div id="tagsFull">
            {" "}
            {this.state.data.tags.map(t => (
              <li id="hashTag">#{t.replace(/\s/g, "")}</li>
            ))}{" "}
          </div>
          <div id="authorFull">
            Picture taken by: {this.state.data.author.userName}
          </div>
        </div>
      </div>
    );
  }
}

export default Photo;
