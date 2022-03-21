//freecodecamp. (www.youtube.com). (n.d.). 
//Build Your First Blockchain App Using Ethereum Smart Contracts and Solidity. 
//[online] Available at: https://youtu.be/coQ5dg8wM2o 
//[Accessed 8 Mar. 2022].

//talk about what you got from frecodecamp here!
//talk about what this code does


var TodoList = artifacts.require("./UnBolt.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
};