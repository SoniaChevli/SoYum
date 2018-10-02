import React, { Component } from "react";
import warningIcon from "../../icons/warning.png";

class MessageBox extends Component {
  state = {};
  render() {
    return (
      <div className={this.props.messageBox} id="MessageBox">
        <img src={warningIcon} alt="" className="warningIcon" />
        <div className={this.props.messageClassName}>{this.props.message} </div>
        <button
          onClick={this.props.closeMessageBox}
          className={this.props.buttonClassName}
        >
          ok
        </button>
      </div>
    );
  }
}

export default MessageBox;
