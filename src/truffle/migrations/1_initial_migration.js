//this is the migration file 1 therefore it is executed 1nd

//bootsrapped from truffle initilisation
//this is used to ...
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
