pragma solidity >=0.4.25 <0.7.0;

// This is just a task contract.
contract Tasks {
    // state variable to keep track of the number of tasks.
    uint256 public taskCount = 0;

    //allows to use id as key to find tasks (basically search task by id)
    mapping(uint256 => Task) public tasks;

    //constructor
    //executed once when a contract is created and it initialises contract state.
    constructor() public {
        createTask( "Source Leather",1,0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE);
        createTask( "Transport to Factory",1,0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE);
    }

    //https://www.tutorialspoint.com/solidity/solidity_enums.htm
    //used this is learn the sturcutre of how to use enums and
    //create functions for accessing their values
    enum States {Pending, InProgress, Cancelled, Complete }
    States choice;
    States constant defaultChoice = States.Pending;

    //definition of a data type of Task using structs
    struct Task {
        //attributes of the struct
        uint256 id;
        string content;
        uint256 assetId;
        bool completed;
        address signator;
    }

    //create a task
    function createTask(string memory _taskcontent, uint256 assetId, address signator) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _taskcontent, assetId, false, signator);
    }
    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        require(msg.sender == _task.signator, "This function is restricted to the signator");
        _task.completed = !_task.completed;
        tasks[_id] = _task;
  }


    // Defining a function to set value of inprogress to state enum
    function setStart() public{
        choice = States.InProgress;
    }
    // Defining a function to set value of complete to state enum
    function setComplete() public{
        choice = States.Complete;
    }
    // Defining a function to set value of cancelled to state enum
    function setCancelled() public{
        choice = States.Cancelled;
    }
    // Defining a function to return value of choice 
    function get_choice() public view returns (States) {
      return choice;
    }
    // Defining function to return default value
    function getdefaultvalue() public pure returns(States) {  
        return defaultChoice;  
    } 

}

//To access in truffle console 
// truffle compile
// truffle migrate --reset
// truffle console

// task = await Tasks.deployed()
// taskOne = await task.tasks(1)
// taskOne.id.toNumber()
// taskOne.signator
// taskOne.completed