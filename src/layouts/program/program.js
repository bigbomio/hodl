

import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm, LoadingContainer } from 'drizzle-react-components'
import BBContractForm from '../component/BBContractForm'
import logo from '../../logo.png'
import '../../App.css'

class Program extends Component {
  render() {
    return (
      <LoadingContainer>
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
          
             <h3 className = "newstype">Approve BBO</h3>
             
            <BBContractForm name = 'approve' contract="BBOTest" method="approve" defaultValues = {{
              _spender: '0xd4996f045e2e4bdc5eb6b5fbc8c018e3069efc24',
              _value: 10
            }} labels={['Contract Address', 'Amount BBO']} />

            <h3 className = "newstype">Lock BBO</h3>
            <ContractForm contract="BBOHoldingContract" method="depositBBO" labels={['Amount']} />
            <br/><br/>
          </div>

        </div>
      </main>
      </LoadingContainer>
    )
  }
}

export default Program
