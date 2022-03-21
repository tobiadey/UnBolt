// const UnBolt = artifacts.require("UnBolt");
const Task = artifacts.require("Task");
const Asset = artifacts.require("Asset");


module.exports = function(deployer) {
  //https://ethereum.stackexchange.com/questions/17558/what-does-deploy-link-exactly-do-in-truffle
    // deploy Task into the network
    deployer.deploy(Task);
    // Take the deployed Task address and link it to Asset contract in bytecode
    deployer.link(Task, Asset);
    // Now deploy the linked Asset contract to the network
    deployer.deploy(Asset);

  };