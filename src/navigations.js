import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './navigations.css'

class Navigation extends Component {
  
  render() {
    return ( 
      <main>
    <div className="menu">
    <div className="container no-padding">
     <img className='img-logo' src="md_bb_logo.png" />
    <ul className="menu-sub" >
        <li><Link to="/">Home</Link></li>
        <li><Link to="/join">Join</Link></li>
        <li><a href="https://coinmarketcap.com/vi/currencies/bigbom/#markets"target = "_bank" >Buy BBO</a></li>
        <li><a href="https://github.com/bigbomio/hodl"target = "_bank">GitHub</a></li>
        <li><a className='telegram' href="https://t.me/bigbomicogroup"target = "_bank"><img className='img-tele' src='telegram.png' /></a></li>
    </ul>
    </div>
    </div>

  </main>
  
    );
  }
}

export default Navigation