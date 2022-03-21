// pragma solidity >=0.4.25 <0.7.0;

// // This is just an asset contract.

// contract UnBolt {
//     // state variable to keep track of the number of assets and tasks.
//     uint256 public assetCount = 0;
//     uint256 public taskCount = 0;

//     //allows to use id as key to find assets & tasks (basically search asset by id)
//     mapping(uint256 => Asset) public assets;
//     mapping(uint256 => Task) public tasks;

//     //constructor, execultes when code is run
//     constructor() public {
//         createAsset("Berken Bag", 1000);
//         createTask( "Source Leather",1);
//     }

//     //https://www.tutorialspoint.com/solidity/solidity_enums.htm
//     enum TaskState {Pending, InProgress, Cancelled, Complete }
//     TaskState choice;
//     TaskState constant defaultChoice = TaskState.Pending;

//     //definition of a data type of Asset using structs
//     struct Asset {
//         //attributes of the struct
//         uint256 id;
//         string assetName;
//         uint256 quantity;
//         bool completed;
//     }

//     //definition of a data type of Task using structs
//     struct Task {
//         //attributes of the struct
//         uint256 id;
//         string content;
//         uint256 assetId;
//         bool completed;
//     }

//     function createAsset(string memory _assetName, uint256 quantity) public {
//         assetCount++;
//         assets[assetCount] = Asset(assetCount, _assetName, quantity, false);
//     }

//     function createTask(string memory _taskcontent, uint256 assetId) public {
//         taskCount++;
//         tasks[taskCount] = Task(taskCount, _taskcontent, assetId, false);
//     }

//     // Defining a function to set value of inprogress to state enum
//     function setStart() public{
//         choice = TaskState.InProgress;
//     }
//     // Defining a function to set value of complete to state enum
//     function setComplete() public{
//         choice = TaskState.Complete;
//     }
//     // Defining a function to set value of cancelled to state enum
//     function setCancelled() public{
//         choice = TaskState.Cancelled;
//     }
//     // Defining a function to return value of choice 
//     function get_choice() public view returns (TaskState) {
//       return choice;
//     }
//     // Defining function to return default value
//     function getdefaultvalue() public pure returns(TaskState) {  
//         return defaultChoice;  
//     } 

// }
