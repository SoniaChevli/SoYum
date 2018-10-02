import React, { Component } from "react";

class DisplayImages extends Component {
  state = {};
  componentWillMount() {
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

  handleImages = d => {
    let photos = this.state.photos;
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
        onClick={() => this.handleSelectedImage(d._id)}
      />
    ));
  };

  render() {
    return <div className="allImages">{this.handleImages()}</div>;
  }
}

export default DisplayImages;
