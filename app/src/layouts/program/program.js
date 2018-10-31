

import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'
import '../../App.css'

class Program extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            {/* <img src={logo} alt="drizzle-logo" /> */}
            <h1 className = "newstype">Midas Foundation Long-term HODLING program for BBO Hodlers</h1>
            <p>Contract address.</p>
            <pre>
            <code>0xd4996f045e2e4bdc5eb6b5fbc8c018e3069efc24</code>
            </pre>

            <br/><br/>
          </div>
          
      
          <div className="pure-u-1-1">
            <h2 className = "newstype">BBO Token</h2>
            <p><strong>My Balance</strong>: <ContractData contract="BBOTest" method="balanceOf" methodArgs={[this.props.accounts[0]]} /></p>
          
             <h3 className = "newstype">Approve</h3>
             
            <ContractForm contract="BBOTest" method="approve" labels={['Contract Address', 'Amount BBO']} />

            <h3 className = "newstype">Lock BBO</h3>
            <ContractForm contract="BBOHoldingContract" method="depositBBO" labels={['Amount']} />
            <br/><br/>
          </div>

        </div>
      </main>
    )
  }
}

export default Program
