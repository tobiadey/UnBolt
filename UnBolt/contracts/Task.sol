pragma solidity >=0.4.25 <0.7.0;

// This is just a task contract.

contract Task {
    // state variable to keep track of the number of tasks.
    uint256 public taskCount = 0;

    //allows to use id as key to find assets & tasks (basically search asset by id)
    mapping(uint256 => Task) public tasks;

    //constructor, execultes when code is run
    constructor() public {
        createTask( "Source Leather",1);
    }

    //https://www.tutorialspoint.com/solidity/solidity_enums.htm
    enum States {Pending, InProgress, Cancelled, Complete }
    States choice;
    States constant defaultChoice = States.Pending;

    //definition of a data type of Asset using structs
    struct Asset {
        //attributes of the struct
        uint256 id;
        string assetName;
        uint256 quantity;
        bool completed;
    }

    //definition of a data type of Task using structs
    struct Task {
        //attributes of the struct
        uint256 id;
        string content;
        uint256 assetId;
        bool completed;
    }

    function createTask(string memory _taskcontent, uint256 assetId) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _taskcontent, assetId, false);
    }


    // Defining a function to set value of inprogress to state enum
    function setStart() public{
        choice = TaskState.InProgress;
    }
    // Defining a function to set value of complete to state enum
    function setComplete() public{
        choice = TaskState.Complete;
    }
    // Defining a function to set value of cancelled to state enum
    function setCancelled() public{
        choice = TaskState.Cancelled;
    }
    // Defining a function to return value of choice 
    function get_choice() public view returns (TaskState) {
      return choice;
    }
    // Defining function to return default value
    function getdefaultvalue() public pure returns(TaskState) {  
        return defaultChoice;  
    } 



}
