import React, { Component } from 'react'
;import PropTypes from 'prop-types'
import '../../App.css'
import { Link } from 'react-router-dom'
import BBButton from '../component/BBButton';


class Join extends Component {

    constructor(props, context) {
        super(props);
        this.classes  = props;
        this.depositStartTime = 1540377259;
        this.depositStopTime = 1545561259;
        this.linkPostMyEtherWallet = 'https://hackernoon.com/wtf-is-the-blockchain-1da89ba19348';

        this.state = {
            remainTime: this.depositStopTime - Math.round(new Date().getTime()/1000),
        };

    }

    componentDidMount() {
        this.timer = setInterval(this.caculateRemainTime.bind(this), 1000);
    }

    componentWillUnmount() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {
        
        return (
            <main className="container">
             <div className="pure-g">
             <div className="pure-u-1-1 header">
             <h1 className = "newstype">Midas Foundation Long-term HODLING program for BBO Hodlers</h1>
            <h2>Program Status</h2>
            <strong>Deposit end in :  </strong>
            <div>
               {this.state.remainTime}
               
            </div>

            <div className = 'list-btn'>
        
            <Link to="/metamask">
            <BBButton content="Using By Metamask" className = 'button-text' variant="green" />
            </Link>

            <BBButton content="Using By MyEtherWallet" variant="green" className = 'button-text'  onClick={ ()=> {let newWindow = window && window.open(this.linkPostMyEtherWallet);}}/>
        
    
        </div>
            </div>
            </div>
            </main>

        );
    }

    covertDayTime () {

        var timeStamp = this.depositStopTime - Math.round(new Date().getTime()/1000);
        var days = Math.round(timeStamp / (3600 * 24));
        var hours =Math.floor((timeStamp - days * 3600 * 24)/ 3600);
        var minutes = Math.floor((timeStamp - days * 3600 * 24 - hours * 3600) / 60);
        var seconds = timeStamp - days * 3600 * 24 - hours * 3600 - minutes *  60;
        
        return days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds.';

    }

    caculateRemainTime () {
        this.setState({
            remainTime: this.covertDayTime(),
        });
    }
};
Join.contextTypes = {
    drizzle: PropTypes.object
  }

export default Join
