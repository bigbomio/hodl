import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../../App.css'
import { Link } from 'react-router-dom'
import BBButton from '../component/BBButton';
import Countdown  from './Countdown.js';

class Join extends Component {

    constructor(props, context) {
        super(props);
        this.classes  = props;
        this.linkPostMyEtherWallet = 'https://hackernoon.com/wtf-is-the-blockchain-1da89ba19348';

        this.state = {
            remainTime: this.depositStopTime - Math.round(new Date().getTime()/1000),
        };

    }


    render() {
        
        return (
            <main className="container">
             <div className="pure-g">
             <div className="pure-u-1-1 header">
             <h1 className = "newstype">Midas Foundation Long-term HODLING program <br/> for BBO Hodlers</h1>
            <h2>Program Stage: <strong class="text-green">Deposit</strong></h2>
            
            <div> <strong>Deposit</strong> is ending in (Dec 24th 2018) :   <span>
                <Countdown date={`2018-12-24T00:00:00`} />
               </span>
            </div>
            <h3 class="newstype">JOIN WITH</h3>
            <div className = 'list-btn'>
        
            <Link to="/metamask">
            <BBButton content="Connect Metamask" className = 'button-text metamask' variant="green" />
            </Link>
            <span class="or-text">OR</span>
            <BBButton content="Using MyEtherWallet" variant="green" className = 'button-text mew'  
                onClick={ ()=> {let newWindow = window && window.open(this.linkPostMyEtherWallet);}}/>
        
    
        </div>
            </div>
            </div>
            </main>

        );
    }

};
Join.contextTypes = {
    drizzle: PropTypes.object
  }

export default Join
