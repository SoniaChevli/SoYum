import React, { Component } from "react";
import "../../styles/dropDown.css";
import downArrow from "../../icons/downArrow.png";
import DropDownItems from "./dropDownItems";
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
      console.log("Close Menu Error", err);
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
            <DropDownItems
              menuItems={this.props.menuItems}
              selectedElements={this.props.selectedElements}
              handleSelect={this.props.handleSelect}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropdownMenu;
