import React, { Component } from 'react'

class Me extends Component {
  constructor() {
    super();
    this.state = {
      homeName: "Mr.Tran Network"
    };
  }
  render() {
    return <div>Welcome to the {this.state.homeName}</div>;
  }
}

export default Me
