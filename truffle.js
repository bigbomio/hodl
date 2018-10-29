var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "e7cf61fe75a64b2f91459362e0e5beb8"; // Either use this key or get yours at https://infura.io/signup. It's free.
var mnemonic = "stick vivid chalk unique size vacant insect slim snack journey weasel believe";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
      network_id: "777"
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey),
      network_id: 3,
      gas: 4500000
    },
    kovan: {
      provider: new HDWalletProvider(mnemonic, "https://kovan.infura.io/" + infura_apikey),
      network_id: 42,
      gas: 4500000
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + infura_apikey),
      network_id: 4,
      gas: 4500000
    },
    coverage: {
      host: "127.0.0.1",
      port: 8545, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01, // <-- Use this low gas price
      network_id: 777, // Match any network id
    }
  }
};
