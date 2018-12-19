import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class DisplayPhotos extends Component {
  state = {
    redirect: false,
    redirectPhotoId: null
  };

  setRedirect = redirectPhotoId => {
    let redirect = true;
    this.setState({ redirect, redirectPhotoId });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      let photoId = "/" + this.state.redirectPhotoId;
      return <Redirect to={photoId} />;
    }
  };

  handleImages = (photos, filtered) => {
    if (filtered && filtered.length > 0) {
      photos = filtered;
    }
    return photos.map(d => (
      <img
        key={d._id}
        name="mainPagePhotos"
        src={d.photo}
        id={d._id}
        author={d.author._id}
        alt=""
        onClick={() => this.setRedirect(d._id)}
      />
    ));
  };

  render() {
    let { photos, filtered } = this.props;
    return (
      <div className="allImages">
        {this.renderRedirect()}
        {this.handleImages(photos, filtered)}
      </div>
    );
  }
}

export default DisplayPhotos;
