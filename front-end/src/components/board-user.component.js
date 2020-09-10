import React, { Component } from "react";
import home from "../images/home.png"
//import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  

  render() {
    return (
      <div className="container">
        <img src={home} alt="Home" />
      </div>
    )
  }
}