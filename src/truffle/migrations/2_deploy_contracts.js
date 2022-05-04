//this is the migration file 2 therefore it is executed 2nd
// requires the smart contracts created 
const Task = artifacts.require("Tasks");
const Asset = artifacts.require("Assets");
const Unbolt = artifacts.require("Unbolt");

module.exports = function(deployer) {
    // // deploy Task into the network
    // deployer.deploy(Task);

    // // deploy Task into the network
    deployer.deploy(Asset);

    // deploy Task into the network
    // deployer.deploy(Unbolt);
  };





  //https://ethereum.stackexchange.com/questions/17558/what-does-deploy-link-exactly-do-in-truffle
    // Take the deployed Task address and link it to Asset contract in bytecode
    // deployer.link(Task, Asset);
    // Now deploy the linked Asset contract to the network
