import React, { Component } from "react";
import home from "../images/home.png"
import home2 from "../images/home2.png"
//import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  
  render() {
    return (
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <img src={home} alt="Home" style={{height: 480 + 'px'}} />
          <img src={home2} alt="banner" style={{height: 580 + 'px', marginTop: 1+'%'}} />
        </div>
       
      </div>
    )
  }
}