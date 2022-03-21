
//freecodecamp. (www.youtube.com). (n.d.). 
//Build Your First Blockchain App Using Ethereum Smart Contracts and Solidity. 
//[online] Available at: https://youtu.be/coQ5dg8wM2o 
//[Accessed 8 Mar. 2022].

//talk about what you got from frecodecamp here!
//talk about what this code does


//Use this file to configure your truffle project.
//It's seeded with some common settings for different networks and features like migrations,compilation and testing.

module.exports = {

  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    development: {
      host: "127.0.0.1",  // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none) (port Ganache is running on)
      network_id: "*" // Any network (default: none) * = any
    }
  },
  // Configure your compilers
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}