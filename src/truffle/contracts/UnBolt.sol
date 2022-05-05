// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.25 <0.7.0;
pragma experimental ABIEncoderV2;

//This is an asset contract.
contract Assets{
    uint256 public assetCount = 0; //state variable to keep track of the number of assets.
    Asset[] public assets; //allows to use id as key to find assets (basically search asset by id)
    
    // //mappping each asset (id) with an array of assets it is made up of
    // mapping(uint256 => Task[]) public userAssetMap;

    //constructor - executed once when a contract is created and it initialises contract state.
    constructor() public { 
        createAsset("Berken Bag", 1000);
        createAsset("PS4", 4500);
        createAsset("Iphone 6", 6500);
        createAsset("Xbox 1", 1500);
        createAsset("Issey Miyake Top", 19000);
    }

    //definition of a data type of Asset using structs
    struct Asset {
        //attributes of the struct
        uint256 id;
        string assetName; 
        uint256 quantity;
        bool completed;
        address creator;
    }
   
    //creation of events
    event AssetCreated(uint256 indexed id,string indexed _assetName, uint256 _quantity, bool completed,address indexed creator);
    event CompletedAssetValueChanged(bool indexed newValue); 

    //create an asset
    // function createAsset(string calldata _assetName, uint256 _quantity) external returns (bool){
    function createAsset(string memory _assetName, uint256 _quantity) public returns (bool){
        assetCount++;
        Asset memory newAsset; //an empty temporary Asset object
        // adding the function paramenter values to it then
        newAsset.id = assetCount;
        newAsset.assetName = _assetName;
        newAsset.quantity = _quantity;
        newAsset.completed = false;
        newAsset.creator = msg.sender;
        assets.push(newAsset); // Push the newAsset struct into the asset array
        
        //emit event to stack
        emit AssetCreated(newAsset.id,newAsset.assetName,newAsset.quantity,newAsset.completed,newAsset.creator);
        return true;
    }

    function getAssets() public view returns (Asset[] memory){
        return assets;
    }

    // function getUserid(address _userAddress) public view returns (uint){
    //     Asset
    // }

    // function getUserAssets(address _userAddress) public view returns (Asset[] memory){
    //     Asset[] memory tempAsset;

    //     for (uint i=0; i<assets.length; i++){
    //         Asset memory newAsset; //an empty temporary Asset object
    //         if(assets[i].creator == _userAddress ){
    //             tempAsset.push(assets[i]);
    //         }
    //     }
    //     return tempAsset;

    // }

    //change the toggle completed variable to the opposide of current value
    // should only works if all tasks associated with the asset are completed (need to work on this!)
    function toggleAssetCompleted(uint _id) public returns (bool){
        Asset memory _asset = assets[_id-1];
        _asset.completed = !_asset.completed;
        assets[_id-1] = _asset;

        emit CompletedAssetValueChanged(!_asset.completed);
        //maybe use !!_asset.completed insted of true and false when trying to automatically complete and asset!!
        return !_asset.completed;  // retruns the new value 
    }

}

//This is just a task contract.
// Tasks which inherts from Assets (all functions and variables from Assets can be accessed int Tasks)
contract Tasks is Assets{ //make assets the parent contract

    //state variable to keep track of the number of assets.
    uint256 public taskCount = 0;
    
    //allows to use id as key to find tasks (basically search task by id)
    Task[] public tasks;

    // mapping(uint256 => Asset) public taskAssetMap;

    //mappping each asset (id) with an array of Tasks it is made up of
    mapping(uint256 => Task[]) public assetTaskMap;

    //constructor - executed once when a contract is created and it initialises contract state.
    constructor() public {
        createTask( "Source Leather","Make sure it is the best quality mushroom leather",1,0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE);
        createTask( "Transport to Factory","Make to deliver before 2/03/2022",1,0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE);
        createTask( "Assemble the plastic","Make sure to use blue plastic!",3,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
    }

    //definition of a data type of Task using structs
    struct Task {
        //attributes of the struct
        uint256 id;
        string content;
        string creator_note; //the task creators message 
        string intermediary_note; // the signators message (e.g message on why things are behind schedule)
        bool completed;
        address signator;
        Asset asset; //an Asset object/struct what is associated with the task
    }

    event Sender(address indexed who, address indexed signator );
    event TaskCreated(uint indexed id,address indexed who, string indexed content);
    event CompletedTaskValueChanged(bool indexed newValue);
    //create a task
    function createTask(string memory _taskContent,string memory _note, uint256 _assetId, address _signator) public returns (bool){        
        
        //get asset assoicated with current task and make sure 
        //the function is being called by the asset creator
        Asset memory currAsset;  //create empty temporary Asset
        currAsset = assets[_assetId-1]; //get the associated asset value to store temporary asset
        require(msg.sender == currAsset.creator, "This function is restricted to the asset creator"); 

        taskCount++;
        //create an empty temporary Task object adding the function paramenter values to it then
        //it is pushed into the the array of assets
        Task memory newTask; 
        newTask.id = taskCount;
        newTask.content = _taskContent;
        newTask.creator_note = _note;
        newTask.intermediary_note = '';
        newTask.completed = false;
        newTask.signator = _signator;
        newTask.asset = assets[_assetId-1];
        tasks.push(newTask); // Push the newTask struct into the task array

        // map newly created task to its associated assed based on the "_assedID"
        assetTaskMap[_assetId-1].push(newTask); // each assetid maps to a task[]

        emit TaskCreated(newTask.id,newTask.signator,newTask.content);
        return true;
    }

    //get all tasks 
    function getAllTasks() public view returns (Task[] memory){
        return tasks;
    }

    //get all tasks associated with a certain asset (by using assetID)
   function getAssetTasks( uint256 _assetID) public view returns (Task[] memory){
        Task[] memory _tasks = assetTaskMap[_assetID-1];
        return _tasks;
    }

    // add a message for a task being perfromed (signators message)
    function addDescription(uint _id,string memory _note ) public{
        Task memory _task = tasks[_id-1];
        emit Sender(msg.sender,_task.signator);
        require(msg.sender == _task.signator, "This function is restricted to the signator");
        _task.intermediary_note = _note;
        tasks[_id-1] = _task;
    }

    //change the toggle completed variable to the opposide of current value
    function toggleTaskCompleted(uint _id) public returns (bool){
        Task memory _task = tasks[_id-1];
        // require(msg.sender == _task.signator, "This function is restricted to the signator");
        _task.completed = !_task.completed;
        tasks[_id-1] = _task;


        //find the index of the task in the assetTaskMap
        Task[] memory _allTasks = getAssetTasks(_task.asset.id);
        uint8 index = 0;
        for (index; index < _allTasks.length-1; index++) {
            if (_allTasks[index].id == _id) {
                index = index;
                break;
            } 
        }
        //make these changes in the asset task map
        // assetTaskMap[_task.asset.id-1][0] = _task;
        assetTaskMap[_task.asset.id-1][index] = _task;

      
        // Task[] memory _allTasks = getAssetTasks(_task.asset.id);
        
        

        emit CompletedTaskValueChanged(!_task.completed);
        return !_task.completed;  // retruns the new value 
    }
}

// //when a contract inherits from these two only 1 contract is created on the blockchain which is this one
// contract Unbolt is Tasks{  //inheritance

// }


// task1 = await unbolt.tasks(0)
// task2 = await unbolt.tasks(1)
// unbolt.toggleTaskCompleted(1)
// unbolt.toggleTaskCompleted(2)

// createTask( "ass name1","asset content",3,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
// createTask( "task of this","task noted from creator",3,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
