import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../../App.css'
import { Link } from 'react-router-dom'
import BBButton from '../component/BBButton';
import Countdown  from './Countdown.js';
import Web3 from 'web3';
import BBOHoldingContract from '../../../build/contracts/BBOHoldingContract.json'
import CurrencyFormat from 'react-currency-format';

class Join extends Component {

    constructor(props, context) {
        super(props);
        this.classes  = props;
        this.linkPostMyEtherWallet = 'https://github.com/bigbomio/hodl/blob/master/src/layouts/introduce/content.md#using-myetherwallet';

        this.state = {
            currentAvailableReward: 0,
            depositStopTime: 1543485600,
            depositStartTime: 0,
            currentDeposited: 0,
            stage: 'Deposit'
        };
       
    }

    componentDidMount() {
        this.web3Local = new Web3("https://mainnet.infura.io/e7cf61fe75a64b2f91459362e0e5beb8");
        this.BBOHoldingInstance = new this.web3Local.eth.Contract(BBOHoldingContract.abi, '0x5d5673d4e75e4f1a0a51ebb7bdf97491fc745224');
        this.getDepositime();
        this.getCurrentReward();
      //  this.displayStage();
    }

    getDepositime(){
        let that = this;
        that.BBOHoldingInstance.methods.depositStartTime().call().then(function(depositStartTime){
            that.setState({depositStartTime:depositStartTime})
        })
        that.BBOHoldingInstance.methods.depositStopTime().call().then(function(depositStopTime){
            that.setState({depositStopTime:depositStopTime})
        })
    }
    displayStage(){
        if(this.state.depositStartTime > 0){
            if(this.state.stage!= 'Deposit'){
                this.setState({stage : 'Deposit'});
            }
            return(
                <div> <strong>Deposit</strong> is ending in ({this.displayDateUTC(this.state.depositStopTime)}):   <span>
                    <Countdown date={this.displayDateUTC(this.state.depositStopTime)} />
                   </span>
                </div>
                )
        }else{
            return(
            <div> <strong>Program</strong> will start soon ({this.displayDateUTC(1543485600)}):  <span>
                  <Countdown date={this.displayDateUTC(1543485600)} />
               </span>
            </div>
            )
        }
    }
    getCurrentReward(){
        let that=this;
        that.BBOHoldingInstance.methods.bboDeposited().call().then(function(deposited){
            deposited = that.web3Local.utils.fromWei(deposited, 'ether')
            that.BBOHoldingInstance.methods.bboBalance().call().then(function(balance){
                balance = that.web3Local.utils.fromWei(balance, 'ether')
                let reward = balance - deposited;

                if(that.state.currentAvailableReward != reward){
                    that.setState({currentAvailableReward: reward});
                }
                if(that.state.currentDeposited != deposited){
                    that.setState({currentDeposited: deposited});
                }
            })
        })
    }
    displayDateUTC(time){
        return new Date(time*1000).toUTCString();
    }
    displayCountDown(time){
        let now = new Date()/1000;
        if(now < time){
            return(
            <div> 
                <strong>Deposit</strong> is ending in ({this.displayDateUTC(this.state.depositStopTime)}):   <span>
                    <Countdown date={this.displayDateUTC(this.state.depositStopTime)} />
                   </span>
            </div>
                )
        }else{
            return''
        }
    }
    render() {
       
        return (
            <main className="container">
             <div className="pure-g">
             <div className="pure-u-1-1 header">
             <h1 className = "newstype">Midas Foundation Long-term HODLING program <br/> for BBO Hodlers</h1>
            <h2>Program Stage: <strong className="text-green">Locking</strong></h2>
            <h2>Current Available Rewards:<strong className="text-green"> <CurrencyFormat displayType='text' decimalScale= {2} value={(this.state.currentAvailableReward)} thousandSeparator={true} prefix={''} /> BBO</strong></h2>
            <h2>Current Deposited:<strong className="text-green"> <CurrencyFormat displayType='text' decimalScale= {2} value={(this.state.currentDeposited)} thousandSeparator={true} prefix={''} /> BBO</strong></h2>
            
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
