// connect truffle to ganache blockchain from the truffle documentation
// Configuring Truffle to connect to Ganache - https://trufflesuite.com/docs/ganache/reference/ganache-settings/
// this exact code was copied from the truffle doucmentation on how to link ganache and truffle
// only change being chaning the network_id form "1234" to "*"
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      // this matches my ganache port
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1500
        }
      }
    }
  }
};

