import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './navigations.css'

class Navigation extends Component {
  
  render() {
    return ( 
      <main>
    <ul className="menu" >
        <li><Link to="/">Home</Link></li>
        <li><Link to="/join">Join</Link></li>
        <li><a href="https://coinmarketcap.com/vi/currencies/bigbom/#markets"target = "_bank" >Buy BBO</a></li>
        <li><a href="https://github.com/bigbomio/hodl"target = "_bank">GitHub</a></li>
        <li><a href="https://bigbom.com/"target = "_bank">Contact</a></li>
    </ul>

  </main>
  
    );
  }
}

export default Navigation