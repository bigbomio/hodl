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
        this.linkPostMyEtherWallet = 'https://github.com/bigbomio/hodl/blob/master/src/layouts/introduce/content.md#using-myetherwallet';

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
            <h2>Program Stage: <strong className="text-green">Deposit</strong></h2>
            
            <div> <strong>Deposit</strong> is ending in (Jan 28th 2019, 10:00:00am UTC Time) :   <span>
                <Countdown date={`2019-01-28T10:00:00`} />
               </span>
            </div>
            <h3 className="newstype">JOIN WITH</h3>
            <div className = 'list-btn'>
        
            <Link to="/metamask">
            <BBButton content="Connect Metamask" className = 'button-text metamask' variant="green" />
            </Link>
            <span className="or-text">OR</span>
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