import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../App.css'
import { drizzleConnect } from 'drizzle-react'
import CurrencyFormat from 'react-currency-format';

class ProgramInner extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts
    var initialState = {bboAmount:0, submiting:false};
    this.account = this.props.accounts[0];
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.bboBalanceKey = this.contracts['BBOTest'].methods['balanceOf'].cacheCall(...[this.account])
    this.bboHoldKey = this.contracts.BBOHoldingContract.methods['holdBalance'].cacheCall({from:this.account})
    this.state = initialState;
    
    
  }

  async handleSubmit() {
    // check allowance

    console.log('handleSubmit ....')
    if(this.state['bboAmount']>0){
      if(this.state['submiting'])
        return;
      this.setState({'submiting':true});
      var allowance = await this.contracts['BBOTest'].methods.allowance(this.props.accounts[0], this.contracts.BBOHoldingContract.address).call();
      //var allowance = this.props.contracts['BBOTest']['allowance'][this.bboAllowanceKey].value;
      console.log(allowance);
      var that = this;
      if(allowance > 0){
        if(this.context.drizzle.web3.utils.fromWei(allowance, 'ether') == this.state['bboAmount']){
         return this.contracts.BBOHoldingContract.methods['depositBBO'].cacheSend(...[]);
        }else{
          // todo set allowance to 0
          
          let otx = this.contracts.BBOTest.methods.approve(this.contracts.BBOHoldingContract.address, 0).send();
          setTimeout(function(){
            that.contracts.BBOTest.methods.approve(that.contracts.BBOHoldingContract.address,  that.context.drizzle.web3.utils.toWei(that.state['bboAmount'], 'ether')).send();
            setTimeout(function(){
                that.setState({'submiting':false});
                  return that.context.drizzle.web3.eth.sendTransaction({from:that.props.accounts[0],
                      to: that.contracts.BBOHoldingContract.address,
                      value: 0
                  })
            }, 5000);
          }, 5000);
        }
        console.log('here 1');
      }else{
        // do approve
        
          let otx2 = this.contracts.BBOTest.methods.approve(this.contracts.BBOHoldingContract.address, this.context.drizzle.web3.utils.toWei(this.state['bboAmount'], 'ether')).send()
          setTimeout(function(){
            that.setState({'submiting':false});
              return that.context.drizzle.web3.eth.sendTransaction({from:that.props.accounts[0],
                  to: that.contracts.BBOHoldingContract.address,
                  value: 0
              })
            }, 5000);
          
      }
    }else{
      alert('BBO Amount must be greater 0');
    }
  }


  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }

  render() {
    var bboBalance = 0;
    var bboHoldBalance = 0;
    if(this.account != this.props.accounts[0]){
      this.account = this.props.accounts[0]
      this.bboBalanceKey = this.contracts['BBOTest'].methods['balanceOf'].cacheCall(...[this.account])
      this.bboHoldKey = this.contracts.BBOHoldingContract.methods['holdBalance'].cacheCall({from:this.account})
    }else{
      if(this.bboBalanceKey in this.props.contracts['BBOTest']['balanceOf']) {
        bboBalance = this.props.contracts['BBOTest']['balanceOf'][this.bboBalanceKey].value;
        bboBalance = this.context.drizzle.web3.utils.fromWei(bboBalance,'ether');
      }
      if(this.bboHoldKey in this.props.contracts.BBOHoldingContract['holdBalance']) {
        bboHoldBalance = this.props.contracts.BBOHoldingContract['holdBalance'][this.bboHoldKey].value;
        bboHoldBalance = this.context.drizzle.web3.utils.fromWei(bboHoldBalance,'ether');
      }
    }
    
    
    return (
      <main className="container">
        <div className="">
          <div className="pure-u-1-1 header">
            <h1 className = "newstype">Midas Foundation Long-term HODLING program <br/> for BBO Hodlers</h1>
            

            <br/><br/>
          </div>
          
        
          <div className="container-fix-600">
            <p><strong>Your Address:</strong> {`${this.props.accounts[0]}`}</p>
            <p><strong>BBO Balance</strong>: <span className="color-green"><CurrencyFormat displayType='text' decimalScale='2' value={bboBalance} thousandSeparator={true} prefix={''} /></span></p>
            <p><strong>Current BBO in Holding contract</strong>: <span className="color-green"><CurrencyFormat displayType='text' decimalScale='2' value={bboHoldBalance} thousandSeparator={true} prefix={''} /></span></p>
          
             <h3 className = "newstype">Deposit BBO</h3>
            <p>
            <input className="input-bbo" key="bboAmount" type="number" name="bboAmount" onChange={this.handleInputChange} />
            </p>
            <p><button key="submit" className="deposit-button" type="button" onClick={this.handleSubmit}>Deposit</button>
            </p>
            <br/><br/>
          </div>

        </div>
      </main>
    )
  }
}

ProgramInner.contextTypes = {
  drizzle: PropTypes.object
}
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    contracts: state.contracts
  }
}

export default drizzleConnect(ProgramInner, mapStateToProps)
