import React, { Component } from "react";
import "../../styles/dropDown.css";
import downArrow from "../../icons/downArrow.png";

class DropdownMenu extends Component {
  state = {
    showMenu: false,
    selectedElements: [],
    color: "white"
  };

  showMenu = event => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      this.setState({ buttonColor: "#f97720" });
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = e => {
    if (!this.dropdownMenu.contains(e.target)) {
      this.setState({ showMenu: false }, () => {
        this.setState({ buttonColor: "white" });

        document.removeEventListener("click", this.closeMenu);
      });
    }
  };

  render() {
    return (
      <div>
        <button
          id="dropDown"
          onClick={this.showMenu}
          style={{ backgroundColor: this.state.buttonColor }}
        >
          {this.props.label}
          <img src={downArrow} alt="" id="downArrow" />
        </button>
        {this.state.showMenu ? (
          <div
            className="menu"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <ul>
              {this.props.menuItems.map(d => (
                <li key={d}>
                  <input
                    type="checkbox"
                    onClick={e => this.props.handleSelect(e, d)}
                  />
                  <label style={{ marginLeft: "6px" }}> {d}</label>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropdownMenu;
