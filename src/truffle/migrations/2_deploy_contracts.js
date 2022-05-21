//this is the migration file 2 therefore it is executed 2nd
// requires the smart contracts created 
// const Assets = artifacts.require("Assets");
// const Tasks = artifacts.require("Tasks");
const Unbolt = artifacts.require("Unbolt");


module.exports = function(deployer) {
    // deploy Assets into the network
    // deployer.deploy(Assets);

    // // deploy Tasks into the network
    // deployer.deploy(Tasks);

    // deploy UnBolt into the network
    deployer.deploy(Unbolt);
  };





  //https://ethereum.stackexchange.com/questions/17558/what-does-deploy-link-exactly-do-in-truffle
    // Take the deployed Task address and link it to Asset contract in bytecode
    // deployer.link(Task, Asset);
    // Now deploy the linked Asset contract to the network
