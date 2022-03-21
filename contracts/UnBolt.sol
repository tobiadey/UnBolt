pragma solidity >=0.4.22 <0.9.0;

contract UnBolt {
    // state variable to keep track of the number of assets and tasks.
    uint256 public assetCount = 0;
    uint256 public taskCount = 0;

    //allows to use id as key to find assets & tasks (basically search asset by id)
    mapping(uint256 => Asset) public assets;
    mapping(uint256 => Task) public tasks;

    //definition of a data type of Task using structs
    // https://docs.soliditylang.org/en/v0.8.10/types.html  get data types you can use,
    //find out how to use Task as a nonprimitive dt for ASSET!

    // enum States = ['pending','cancelled']

    struct Asset {
        //attributes of the struct
        uint256 id;
        string assetName;
        uint256[] tasksIds;
        bool completed;
    }

    //definition of a data type of Task using structs
    struct Task {
        //attributes of the struct
        uint256 id;
        string taskName;
        bool completed;
    }

    constructor() public {
        createAsset("Create a second task!");
    }

    // functions

    //create assets
    function createAsset(string memory _assetName) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _assetName, false);
    }

    //create asset
    //create task
    //add task to asset (with id as parameter)
    //toggle complete asset (automatic)
    //toggle complete task (manual)

    //events
    //asset created
    //asset completed
    //task created
    //task completed
}
