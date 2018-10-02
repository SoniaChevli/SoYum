import React, { Component } from "react";
import "../../styles/dropDown.css";
import downArrow from "../../icons/downArrow.png";

class DropdownMenu extends Component {
  state = {
    showMenu: false,
    color: "white"
  };

  showMenu = async event => {
    event.preventDefault();
    await this.setState({ showMenu: true }, () => {
      this.setState({ buttonColor: "#f97720" });
      this.setState({ selectedElements: this.props.selectedElements });
      document.addEventListener("click", this.closeMenu);
    });
    console.log("current dropDown State", this.state);
  };

  closeMenu = e => {
    try {
      if (!this.dropdownMenu.contains(e.target)) {
        this.setState({ showMenu: false }, () => {
          this.setState({ buttonColor: "white" });

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
