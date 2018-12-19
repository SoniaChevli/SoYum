import React, { Component } from "react";
import "../../styles/dropDown.css";
import downArrow from "../../icons/downArrow.png";

class DropdownMenu extends Component {
  state = {
    showMenu: false,
    buttonColor: "white"
  };

  showMenu = event => {
    event.preventDefault();
    let showMenu = true;
    let buttonColor = "#f97720";
    let selectedElements = this.props.selectedElements;
    this.setState({ showMenu, buttonColor, selectedElements }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = e => {
    try {
      if (!this.dropdownMenu.contains(e.target)) {
        let showMenu = false;
        let buttonColor = "white";
        this.setState({ showMenu, buttonColor }, () => {
          document.removeEventListener("click", this.closeMenu);
        });
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  render() {
    return (
      <div>
        <button
          id={this.props.buttonId}
          onClick={this.showMenu}
          style={{ backgroundColor: this.state.buttonColor }}
        >
          {this.props.label}
          <img src={downArrow} alt="" id="downArrow" />
        </button>
        {this.state.showMenu ? (
          <div
            className={this.props.menuId}
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <ul>
              {this.props.menuItems.map(d => (
                <li id="dropList" key={d}>
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    checked={this.props.selectedElements.includes(d)}
                    onClick={e => {
                      this.props.handleSelect(e, d);
                    }}
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
