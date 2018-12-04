import BBOHoldingContract from './../build/contracts/BBOHoldingContract.json'
import BBOTest from './../build/contracts/BBOTest.json'


const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    BBOHoldingContract,
    BBOTest
  ],
  events: {
  },
  polls: {
    accounts: 1500
  },
  syncAlways: true

}

export default drizzleOptions